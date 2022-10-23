import { AvailableAt, StoreAdresses } from '../interfaces';
import mapboxgl, { Marker, Map } from 'mapbox-gl';

function htmlToElement(html: string): HTMLElement {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild as HTMLElement;
}

function getIcon(storeId: string) {
  const storeName = storeId.includes('DM') ? 'DM' : 'ROSSMANN';
  switch (storeName) {
    case 'DM':
      return 'storeFavicons/DM.png';
    case 'ROSSMANN':
      return 'storeFavicons/ROSSMANN.ico';
    default:
      return '';
  }
}

declare var myMap: Map;
declare var currentMarkers: Marker[];

const setMarkers = (availableAt: AvailableAt | undefined, storeAddresses: StoreAdresses) => {
  if (!availableAt || !availableAt.features) {
    return;
  }

  const { features } = availableAt;

  for (const { properties } of features) {

    const { storeId, inStock, formattedPrice, stockLevel, url } = properties;

    if (!storeAddresses[storeId] || !inStock) {
      continue;
    }

    const { lon, lat } = storeAddresses[storeId].location;
    const { address } = storeAddresses[storeId];
    const customMarker = htmlToElement(`
      <div class="marker" style="position: absolute;">
          <div class="localize-marker">
            <div class="localize-marker-bubble subpixel-antialiased">
              <img src="${getIcon(storeId)}" alt="Shop icon" style="height: 16px; margin-right: 5px"/>
              ${formattedPrice}
            </div>
            <div class="localize-marker-pointer">
              <div class="localize-marker-pointer-left"></div>
              <div class="localize-marker-pointer-middle">
                <div class="localize-marker-pointer-middle-1"></div>
                <div class="localize-marker-pointer-middle-2"></div>
                <div class="localize-marker-pointer-middle-3"></div>
              </div>
              <div class="localize-marker-pointer-right"></div>
            </div>
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
              <a href=${url} target="_blank">
                <span class="text-green-800">
                  <b>${stockLevel ?? ''}</b> Verfügbar&nbsp;
                </span> 
                <picture>
                  <source srcSet="arrow-up-right-from-square-solid-light.svg" media="(prefers-color-scheme: light)" />
                  <source srcSet="arrow-up-right-from-square-solid-dark.svg" media="(prefers-color-scheme: dark)" />
                  <img src="arrow-up-right-from-square-solid.svg" class="inline h-4 align-sub" alt="link"/>
                </picture>
              </a>
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