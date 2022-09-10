import { Product, SearchResult, StoreAdresses } from '../interfaces';

export async function search(query: string): Promise<SearchResult> {
    if (query !== '') {
        const response = await fetch(
          `https://j6obqvfpnwiomxcpbu6hu22bw40zzlke.lambda-url.eu-central-1.on.aws/?q=${query}`,
          { mode: 'cors' });
        return response.json();
    }

    return {
        products: [] as Product[],
        storeAddresses: {} as StoreAdresses
    } as SearchResult;
}