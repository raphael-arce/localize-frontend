import { component$ } from '@builder.io/qwik';
import { SearchForm } from "./searchForm";
import { SearchMap } from '../searchMap/searchMap';

export const App = component$(() => {
  return (
    <>
      <SearchMap />
      <SearchForm />
    </>
  );
});
