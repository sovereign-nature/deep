<template>
  <div class="lg:px-24 lg:pb-12">
    <p class="text-white">{{ useResult }}{{ loading }}{{ result }}</p>
    <SNIFilter />
    <SNITableMobile :data="souls" class="mx-6 py-12 lg:hidden" />
    <SNITable :data="souls" class="hidden lg:block lg:h-screen lg:w-full" />
  </div>
</template>
<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_POSTS } from '@/api/queries'
const souls = useSouls()
const { loading, result } = useQuery(GET_POSTS)
</script>
