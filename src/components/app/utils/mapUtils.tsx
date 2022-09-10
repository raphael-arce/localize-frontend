import { AvailableAt, StoreAdresses } from '../interfaces';
import mapboxgl, { Marker, Map } from 'mapbox-gl';

declare var myMap: Map;
declare var currentMarkers: Marker[];

const setMarkers = (availableAt: AvailableAt[] | undefined, storeAddresses: StoreAdresses) => {
  if (!availableAt) {
    console.log('no availability')
    return;
  }

  for (const { storeId, stockLevel } of availableAt) {
    if (!storeAddresses[storeId] || stockLevel === 0) {
      continue;
    }

    const { lon, lat } = storeAddresses[storeId].location;
    const { address } = storeAddresses[storeId];
    const marker = new mapboxgl
      .Marker()
      .setLngLat([lon, lat])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <h2>${address.name}</h2>
        <p>
            ${address.street}
            <br>
            ${address.zip}, ${address.city}
            <br>
            <span class="text-green-800"><b>${stockLevel}</b> Verfügbar</span>
        </p>
      `)) // add popup
      .addTo(myMap);
    currentMarkers.push(marker);
  }
}

const removeMarkers = () => {
  currentMarkers.forEach((marker: Marker) => marker.remove());
}

export { setMarkers, removeMarkers };