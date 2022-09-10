import { component$ } from '@builder.io/qwik';
import { SearchForm } from "./searchForm";
import { SearchMap } from './searchMap';

export const App = component$(() => {
  return (
    <div class="my-app">
      <SearchMap />
      <SearchForm />
    </div>
  );
});
