export interface AvailableAt {
    "storeId": string
    "inStock": boolean,
    "stockLevel": number,
}

export interface Product {
    "gtin": number,
    "dan": number,
    "name": string,
    "brandName": string,
    "title": string,
    "isoCountry": string,
    "isoLanguage": string,
    "purchasable": boolean,
    "notAvailable": boolean,
    "relativeProductUrl": string,
    "imageUrlTemplates": string[],
    "price": string,
    "priceLocalized": string,
    "priceCurrencyIso": string,
    "basePrice": {
        "formattedValue": string
    },
    "basePriceLocalized": string,
    "basePriceUnit": string,
    "basePriceQuantity": number,
    "basePriceRelNetQuantity": number,
    "contentUnit": string,
    "netQuantityContent": number,
    "isSellout": boolean,
    "isOnlineOnly": boolean,
    "eyecatchers": [
        {
            "eyecatcherType": string,
            "viewType": string,
            "altText": string,
            "imageUrlTemplate": string,
            "order": number
        }
    ],
    "generalIndicationLabel": boolean,
    "notDiscountAllowed": boolean,
    "notScoreAllowed": boolean,
    "notDeliverableToStore": boolean,
    "ratingValue": number,
    "ratingCount": number,
    "hideStoreAvailability": boolean,
    "variantTypes": {
        "displayStyle": string,
        "moreVariantsText": string
    }[],
    // storeAvailability: StoreAvailability[] | undefined
    availableAt: AvailableAt[] | undefined
}