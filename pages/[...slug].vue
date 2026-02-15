<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
</script>

<template>
  <main>
    <ContentRenderer v-if="page" :value="page" />
    <template v-else>
      <h1 class="text-2xl">
        Page not found
      </h1>
    </template>
  </main>
</template>
