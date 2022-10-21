import { component$, useClientEffect$ } from '@builder.io/qwik';

export declare let myMap: any, isDarkMode: boolean;
export declare let mapboxgl: any;

export const SearchMap = component$(() => {

    useClientEffect$(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibXVsdGlmbHV4IiwiYSI6ImNsNndsaDJmcjA1Zjkzam15bzE3emQwY3AifQ.HzJi-VhL35sbroQR1-nVJA';

        const style = isDarkMode ? 'mapbox://styles/multiflux/cl8oyzobp006y14pfevqtdls0' : 'mapbox://styles/mapbox/streets-v11'

        myMap = new mapboxgl.Map({
            container: 'map', // container ID
            style,
            center: [13.3817493, 52.5114016], // starting position [lng, lat]
            zoom: 12, // starting zoom
            projection: {name: 'globe'} // display the map as a 3D globe
        });

        myMap.on('style.load', () => {
            myMap.setFog({}); // Set the default atmosphere style
        });

        myMap.on('load', function () {
            myMap.resize();
        });

        myMap.addControl(new mapboxgl.NavigationControl({showCompass: false}));
    });

    return (
      <>
        <script src='https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js'></script>
        <link href='mapbox-gl-js_v2.10.0_mapbox-gl.css' rel="preload" as="style" onLoad$={() => {
              // @ts-ignore
              this.onload=null;this.rel='stylesheet'
          }} />
        <div id="map" class="z-0 h-screen w-screen" style={{maxHeight: '-webkit-fill-available', maxWidth: '-webkit-fill-available'}}></div>
      </>
    )
})