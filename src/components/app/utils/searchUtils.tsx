import { Product, SearchResult, StoreAdresses } from '../interfaces';

const url = import.meta.env.DEV ? 'http://0.0.0.0:8787/' : "https://localize-backend.localize-backend.workers.dev/" ;

export async function search(query: string): Promise<SearchResult> {
    if (query !== '') {
        const response = await fetch(
          `${url}?q=${encodeURIComponent(query)}`,
          { mode: 'cors' });
        return response.json();
    }

    return {
        products: [] as Product[],
        storeAddresses: {} as StoreAdresses
    } as SearchResult;
}