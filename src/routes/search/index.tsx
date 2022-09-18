import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { App } from "~/components/app/app";

export default component$(() => {
  return <App />
});

export const head: DocumentHead = {
  title: 'Localize',
};
