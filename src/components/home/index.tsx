import {component$} from "@builder.io/qwik";

export default component$(() => {

  return <>
    <div class="flex h-screen w-screen justify-center flex-col">
      <div class="flex justify-center items-center gap-2 m-2">
        <img
          alt="Qwik Logo"
          width={100}
          height={37}
          loading="lazy"
          src="logo.png"
        />
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
          class="input input-bordered grow shrink"
          style={{ minWidth: '8rem', maxWidth: '24rem'}}
          placeholder="Suche etwas!"
          required
        />
        <button class="btn">Suchen</button>
      </form>
    </div>
  </>
})