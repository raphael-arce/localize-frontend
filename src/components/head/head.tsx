import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { Analytics } from './analytics';
import { Social } from './social';

export const Head = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

    return (
    <head>
      <meta charSet="utf-8" />
      <meta name="description" content="Finde Produkte aus deiner Umgebung!" />
      <title>{head.title ? `${head.title}` : `Localize`}</title>
      { loc.pathname === '/search' ? <link href='mapbox-gl-js_v2.10.0_mapbox-gl.css' rel='stylesheet' /> : undefined }
      { loc.pathname === '/search' ? <link href='markers.css' rel='stylesheet' /> : undefined }
      <link rel='icon' type="image/svg" sizes="32x32" href="/logo.svg" />
      <link rel='icon' type="image/svg" sizes="32x32" href="/favicon-32x32.png" />
      <link rel='icon' type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={loc.href} />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}

      <Social />
      <Analytics loc={loc} />

      <script dangerouslySetInnerHTML="
        var myMap;
        var currentMarkers = [];

        var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      "/>
    </head>
  );
});
