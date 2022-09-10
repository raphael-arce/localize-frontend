import {Product} from "./";

export interface Address {
    name: string;
    street: string;
    zip: string;
    city: string;
}

export interface Location {
  lat: number,
  lon: number
}

export interface StoreAdresses {
  [key: string]: {
    address:  Address,
    location: Location
  }
}

export interface SearchResult {
  products: Product[],
  storeAddresses: StoreAdresses
}

// export interface SearchResult {
//     count: number,
//     currentPage: number,
//     facets: {
//             key: string,
//             multiSelect: boolean,
//             operation: string,
//             order: number,
//             sort: string,
//             translation: string,
//             values: {
//               name: string,
//               count: number
//             }[]
//     }[],
//     pageSize: number,
//     products: Product[],
//     totalPages: number,
// }
