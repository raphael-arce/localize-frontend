import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { App } from "~/components/app/app";

export default component$(() => {
  // return (
  //   <div>
  //     <h1>Welcome to Qwik City</h1>
  //
  //     <p>The meta-framework for Qwik.</p>
  //   </div>
  // );
    return <App />
});

export const head: DocumentHead = {
  title: 'Localize',
};
