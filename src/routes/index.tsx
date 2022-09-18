import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Home from "~/components/home";

export default component$(() => {
    return <Home />
});

export const head: DocumentHead = {
  title: 'Localize',
};
