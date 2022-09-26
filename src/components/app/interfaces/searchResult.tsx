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