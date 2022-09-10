import {StoreAvailability} from "./storeAvailability";

export interface AvailabilityResult {
    dan: number,
    storeAvailability: StoreAvailability[],
    tenant: string
}