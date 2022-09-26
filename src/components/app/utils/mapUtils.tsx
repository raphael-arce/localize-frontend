import { AvailableAt, StoreAdresses } from '../interfaces';
import mapboxgl, { Marker, Map } from 'mapbox-gl';

function htmlToElement(html: string): HTMLElement {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild as HTMLElement;
}

declare var myMap: Map;
declare var currentMarkers: Marker[];

const setMarkers = (availableAt: AvailableAt[] | undefined, storeAddresses: StoreAdresses) => {
  if (!availableAt) {
    return;
  }

  for (const { storeId, inStock, stockLevel, formattedPrice } of availableAt) {
    if (!storeAddresses[storeId] || !inStock) {
      continue;
    }



    const { lon, lat } = storeAddresses[storeId].location;
    const { address } = storeAddresses[storeId];
    const customMarker = htmlToElement(`
<div class="marker" style="position: absolute;">
    <div style="
            position: relative;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
        ">
        <div style="
            border-radius: 9999px;
            border-width: 1px;
            border: black;
            background: white;
            display: inline-flex;
            padding-inline: 10px;
            padding-block: 3px;"
        >
            ${formattedPrice}
        </div>
        <div style="
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid #fff;
                flex: none;
                width: 2px;
            "/>
    </div>
</div>
    `);
    const marker = new mapboxgl
      .Marker({ element: customMarker, anchor: 'bottom' })
      .setLngLat([ lon, lat ])
      .setPopup(new mapboxgl.Popup({offset: 40}).setHTML(`
        <h2>${address.name}</h2>
        <p>
            ${address.street}
            <br>
            ${address.zip}, ${address.city}
            <br>
            <span class="text-green-800"><b>${stockLevel ?? ''}</b> Verfügbar</span>
        </p>
      `))
      .addTo(myMap);
    currentMarkers.push(marker);
  }
}

const removeMarkers = () => {
  currentMarkers.forEach((marker: Marker) => marker.remove());
}

export { setMarkers, removeMarkers };