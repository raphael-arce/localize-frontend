export interface AvailableAt {
    "storeId": string
    "inStock": boolean,
    "stockLevel": number | undefined,
    "formattedPrice": string
}

export interface Product {
    "gtin": number,
    "title": string,
    "imageUrl": string,
    "priceRange": {
        "min": number,
        "formattedMin": number,
        "max": number,
        "formattedMax": number,
    },
    availableAt: AvailableAt[] | undefined
}