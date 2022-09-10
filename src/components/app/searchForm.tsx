import { component$, useClientEffect$, useStore } from '@builder.io/qwik';
import { getQuery, updateURLQueryParams } from './utils/urlQueryUtils';
import { search } from './utils/searchUtils';
import { SearchResult, StoreAdresses } from './interfaces';
import { removeMarkers, setMarkers } from './utils/mapUtils';

export const SearchForm = component$(() => {

  const state = useStore({
    query: '',
    searchResult: {
      products: [],
      storeAddresses: {} as StoreAdresses
    } as SearchResult,
    currentlySelected: 0,
  });

  useClientEffect$(async () => {
    state.query = getQuery();
    state.searchResult = await search(state.query);

    if (!state.searchResult.products[0]) {
      return;
    }

    setMarkers(state.searchResult.products[0].availableAt, state.searchResult.storeAddresses)
  });

  return (
    <div class="fixed bottom-0 left-0 right-0">
      <div class="flex flex-col">
        <form
          class="flex ml-2"
          preventdefault:submit
          onSubmit$={async () => {
            updateURLQueryParams();
            state.query = getQuery();

            state.currentlySelected = 0;
            removeMarkers();

            state.searchResult = await search(state.query);

            if (!state.searchResult.products[0]) {
              return;
            }

            setMarkers(state.searchResult.products[0].availableAt, state.searchResult.storeAddresses)
          }}>
          <input
            value={state.query}
            name="q"
            id="searchInput"
            class="input input-bordered w-full max-w-xs"
            placeholder="Search something!"
          />
          <button class="btn ml-1">Search</button>
        </form>
        <div class="w-screen h-1/3 overflow-auto pt-1">
          <div class="flex flex-nowrap">
              {
                state.searchResult.products.map(({ title, availableAt, price, imageUrlTemplates }, index) => {
                  const imageUrl = imageUrlTemplates[0].replace('{transformations}', 'f_auto,q_auto,c_fit,h_270,w_260');

                  return (
                    <div
                      class={`flex-none card w-60 bg-base-100 shadow-xl ml-2 mb-2 ${state.currentlySelected === index ? 'ring ring-blue-500' : ''}`}
                      onClick$={() => {
                        removeMarkers();

                        if (index !== state.currentlySelected) {
                          setMarkers(availableAt, state.searchResult.storeAddresses);
                          state.currentlySelected = index;
                          return;
                        }

                        state.currentlySelected = -1;
                      }}
                    >
                      <figure class="h-40 px-5 pt-5">
                        <img class="w-auto h-full" loading="lazy" src={imageUrl} alt="alt" />
                      </figure>
                      <div class="card-body h-full">
                        <h2 class="card-title">{price}</h2>
                        <p>{title}</p>
                      </div>
                    </div>
                  );
                })
              }
          </div>
        </div>
      </div>
    </div>
  );
});