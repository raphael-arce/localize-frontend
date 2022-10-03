import {component$} from "@builder.io/qwik";

export default component$(() => {

  return <>
    <div class="flex flex-col h-screen w-screen justify-center" style={{maxHeight: '-webkit-fill-available', maxWidth: '-webkit-fill-available'}}>
      <div class="flex justify-center items-center gap-2 m-2">
        <picture>
          <source srcSet="logo-light.svg" media="(prefers-color-scheme: light)" />
          <source srcSet="logo-dark.svg" media="(prefers-color-scheme: dark)" />
          <img
            alt="Localize Logo"
            width={100}
            height={37}
            src="logo.png"
          />
        </picture>
        <h1 class="text-4xl font-bold">
          Localize
        </h1>
      </div>
      <form
        class="flex justify-center items-center gap-2 m-2"
        action="/search"
      >
        <input
          name="q"
          id="searchInput"
          class="input input-bordered grow shrink text-lg"
          style={{ minWidth: '8rem', maxWidth: '24rem'}}
          placeholder="Suche etwas!"
          required
        />
        <button class="btn">Suchen</button>
      </form>
    </div>
  </>
})