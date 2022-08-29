<template>
  <div>
    <div class="dropdown hidden md:block">
      <label tabindex="0" class="btn m-2 rounded-full">
        <div class="placeholder avatar">
          <div class="w-10 rounded-full bg-neutral-focus text-neutral-content">
            <span class="text-md">K</span>
          </div>
        </div>
        <span class="mx-3">Select network</span>
        <svg
          class="fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17C11.7447 16.9987 11.4929 16.9406 11.2629 16.8299C11.0328 16.7192 10.8303 16.5587 10.67 16.36L6.46001 11.26C6.214 10.953 6.05919 10.583 6.01323 10.1923C5.96726 9.80153 6.03198 9.40574 6.20001 9.05C6.33629 8.74083 6.55868 8.47741 6.84063 8.29122C7.12257 8.10503 7.45215 8.00393 7.79001 8H16.21C16.5479 8.00393 16.8774 8.10503 17.1594 8.29122C17.4413 8.47741 17.6637 8.74083 17.8 9.05C17.968 9.40574 18.0328 9.80153 17.9868 10.1923C17.9408 10.583 17.786 10.953 17.54 11.26L13.33 16.36C13.1697 16.5587 12.9672 16.7192 12.7371 16.8299C12.5071 16.9406 12.2553 16.9987 12 17Z"
          />
        </svg>
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu rounded-box w-52 bg-neutral p-2 shadow"
      >
        <li class="flex">
          <div class="placeholder avatar">
            <div
              class="w-10 rounded-full bg-neutral-focus text-neutral-content"
            >
              <img src="~/assets/images/dot.svg" alt="Polkadot" />
            </div>
            <a class="block">Polkadot</a>
          </div>
        </li>
        <li class="flex">
          <div class="placeholder avatar">
            <div
              class="w-10 rounded-full bg-neutral-focus text-neutral-content"
            >
              <img src="~/assets/images/ksm.svg" alt="Kusama" />
            </div>
            <a>Kusama</a>
          </div>
        </li>
      </ul>
    </div>
    <!-- Mobile  menu -->
    <div class="dropdown-left dropdown md:hidden">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-5 w-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu rounded-box menu-compact w-52 bg-neutral p-2 shadow"
      >
        <h2>Select network</h2>
        <li class="flex">
          <div class="placeholder avatar">
            <div
              class="w-10 rounded-full bg-neutral-focus text-neutral-content"
            >
              <img src="~/assets/images/dot.svg" alt="Polkadot" />
            </div>
            <a class="block">Polkadot</a>
          </div>
        </li>
        <li class="flex">
          <div class="placeholder avatar">
            <div
              class="w-10 rounded-full bg-neutral-focus text-neutral-content"
            >
              <img src="~/assets/images/ksm.svg" alt="Kusama" />
            </div>
            <a>Kusama</a>
          </div>
        </li>
        <h2>Connect your wallet</h2>
        <WalletConnector></WalletConnector>
      </ul>
    </div>
  </div>
</template>
