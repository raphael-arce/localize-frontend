export interface StoreAvailability {
    "store": {
        "storeNumber": string
    },
    "inStock": boolean,
    "stockLevel": number,
    "checkStatus": {
        "status": string,
        "code": string
    }
}