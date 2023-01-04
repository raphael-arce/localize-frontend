import { component$, useClientEffect$, useStore } from '@builder.io/qwik';
import { getQuery, updateURLQueryParams } from './utils/urlQueryUtils';
import { search } from './utils/searchUtils';
import { SearchResult, StoreAdresses } from './interfaces';
import { removeMarkers, setMarkers } from './utils/mapUtils';
import {useLocation} from "@builder.io/qwik-city";

export const SearchForm = component$(() => {
  const { query } = useLocation();

  const state = useStore({
    query: query.q ?? '',
    searchResult: {
      products: [],
      storeAddresses: {} as StoreAdresses
    } as SearchResult,
    currentlySelected: 0,
    isSearching: !!query.q
  });

  useClientEffect$(async () => {
    if (!state.query) {
      return;
    }

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

    const { availableAt } = state.searchResult.products[0];

    await setMarkers(availableAt, state.searchResult.storeAddresses)
  });

  return (
    <div class="fixed bottom-0 left-0 max-w-min">
      <div class="inline-flex flex-col max-w-min">
        <form
          class="inline-flex w-screen xs:w-96 pl-1 pb-1"
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

            const {availableAt} = state.searchResult.products[0];

            await setMarkers(availableAt, state.searchResult.storeAddresses);
          }}>
          <input
            value={state.query}
            name="q"
            id="searchInput"
            class={`input grow shrink input-bordered min-w-50px text-lg ${!state.isSearching && !state.searchResult.products[0] && state.query ? 'input-error' : ''}`}
            placeholder="Suche nach Produkten aus deiner Umgebung!"
          />
          <button class={`btn mx-1 ${state.isSearching ? 'loading' : ''}`}
                  disabled={state.isSearching}>Suchen</button>
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
              state.searchResult.products.map(({title, priceRange, availableAt, imageUrl}, index) => {
                // const imageUrl = imageUrlTemplates[0].replace('{transformations}', 'f_auto,q_auto,c_fit,h_270,w_260');

                return (
                  <div
                    class={`flex-none card w-52 lg:w-60 bg-base-100 shadow-xl ${index === 0 ? 'ml-2' : undefined} mr-2 mb-2 ${state.currentlySelected === index ? 'ring ring-blue-500' : ''}`}
                    onClick$={async () => {
                      removeMarkers();

                      if (index !== state.currentlySelected) {
                        await setMarkers(availableAt, state.searchResult.storeAddresses);
                        state.currentlySelected = index;
                        return;
                      }

                      state.currentlySelected = -1;
                    }}
                  >
                    <figure class="h-24 lg:h-40 px-5 pt-5">
                      <img class="w-auto h-full" loading="lazy" src={imageUrl} alt="Kein verfügbares Bild"/>
                    </figure>
                    <div class="card-body h-full p-5">
                      <h2 class="card-title text-base lg:text-lg">
                        {
                          priceRange.formattedMin === priceRange.formattedMax ?
                          priceRange.formattedMin :
                            `${priceRange.formattedMin} - ${priceRange.formattedMax}`
                        }
                      </h2>
                      <p class="text-sm lg:text-base">{title}</p>
                      { availableAt?.features.length === 0 ?
                        <div class='badge badge-error'>Ausverkauft</div> :
                        <div class='badge badge-success'>Verfügbar</div>
                      }
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