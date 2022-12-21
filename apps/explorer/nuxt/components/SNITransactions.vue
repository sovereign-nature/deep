<template>
  <div class="w-full text-white">
    <h1 class="text-3xl">Transactions</h1>
    <SNITable :data="transactions" class="mt-6 rounded-lg"></SNITable>
  </div>
</template>
<script setup>
const transactions = useTransactions();
</script>
