<template>
  <div class="navbar bg-base-content px-10 py-5 text-white">
    <div class="navbar-start">
      <img class="w-3/12 md:w-1/12" src="~/assets/images/sni-logo.svg" />
    </div>
    <div class="navbar-end">
      <ChainSelector></ChainSelector>
      <WalletConnector class="hidden md:block"></WalletConnector>
    </div>
  </div>
</template>
