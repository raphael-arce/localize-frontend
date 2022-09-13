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
    isSearching: false
  });

  useClientEffect$(async () => {
    state.query = getQuery();

    state.isSearching = true;
    try {
      state.searchResult = await search(state.query);
    } catch (error) {
      console.log(error)
      state.searchResult = {
        products: [],
        storeAddresses: {}
      }
    }
    state.isSearching = false;

    if (!state.searchResult.products[0]) {
      return;
    }

    setMarkers(state.searchResult.products[0].availableAt, state.searchResult.storeAddresses)
  });

  return (
    <div class="fixed bottom-0 left-0 max-w-min">
      <div class="inline-flex flex-col max-w-min">
        <form
          class="inline-flex ml-2"
          preventdefault:submit
          onSubmit$={async () => {
            updateURLQueryParams();
            state.query = getQuery();

            state.currentlySelected = 0;
            removeMarkers();

            state.isSearching = true;
            try {
              state.searchResult = await search(state.query);
            } catch (error) {
              console.log(error)
              state.searchResult = {
                products: [],
                storeAddresses: {}
              }
            }
            state.isSearching = false;

            if (!state.searchResult.products[0]) {
              return;
            }

            setMarkers(state.searchResult.products[0].availableAt, state.searchResult.storeAddresses)
          }}>
          <input
            value={state.query}
            name="q"
            id="searchInput"
            class={`input input-bordered min-w-50px ${!state.isSearching && !state.searchResult.products[0] && state.query ? 'input-error' : ''}`}
            placeholder="Search something!"
          />
          <button class={`btn ml-1 ${state.isSearching ? 'loading' : ''}`}
                  disabled={state.isSearching}>{state.isSearching ? 'Loading' : 'Search'}</button>
        </form>
      </div>
      <div class="inline-flex flex-col max-w-min">
        {!state.isSearching && !state.searchResult.products[0] && state.query !== '' ?
          <div className="card w-60 bg-base-100 shadow-xl m-2">
            <div className="card-body">
              <h2 className="card-title">Woopsie!</h2>
              <p>No results for "{state.query}" were found </p>
            </div>
          </div> : null
        }
        <div class="w-auto overflow-auto pt-1" style={{maxWidth: '100vw'}}>
          <div class="inline-flex flex-nowrap">
            {
              state.searchResult.products.map(({title, availableAt, price, imageUrlTemplates}, index) => {
                const imageUrl = imageUrlTemplates[0].replace('{transformations}', 'f_auto,q_auto,c_fit,h_270,w_260');

                return (
                  <div
                    class={`flex-none card w-52 lg:w-60 bg-base-100 shadow-xl ${index === 0 ? 'ml-2' : undefined} mr-2 mb-2 ${state.currentlySelected === index ? 'ring ring-blue-500' : ''}`}
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
                    <figure class="h-24 lg:h-40 px-5 pt-5">
                      <img class="w-auto h-full" loading="lazy" src={imageUrl} alt="alt"/>
                    </figure>
                    <div class="card-body h-full p-5">
                      <h2 class="card-title text-base lg:text-lg">{price}</h2>
                      <p class="text-sm lg:text-base">{title}</p>
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