import { Product, SearchResult, StoreAdresses } from '../interfaces';

export async function search(query: string): Promise<SearchResult> {
    if (query !== '') {
        const url = import.meta.env.DEV ? 'http://127.0.0.1:3000/search' : 'https://aziofzlwon2st7w4wlwl2ipxr40wywui.lambda-url.eu-central-1.on.aws/ ';
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