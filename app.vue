<script setup lang="ts">
const { data } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})
</script>

<template>
  <div>
    <header>
      <nav>
        <NuxtLink
          to="/"
          active-class="font-bold"
          class="mr-4"
        >
          Home
        </NuxtLink>
        <template v-for="item in data" :key="item.path">
          <NuxtLink active-class="font-bold" class="mr-4" :to="item.path">{{ item.title }}</NuxtLink>
        </template>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>
