export interface Feature {
    "type": "Feature",
    properties: {
        "storeId": string,
        "inStock": boolean,
        "stockLevel": number | undefined,
        "formattedPrice": string,
        'url': string,
    },
    "geometry": {
        "type": "Point",
        "coordinates": [number, number],
    }
}

export interface AvailableAt {
    "type": "FeatureCollection",
    features: Feature[]
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