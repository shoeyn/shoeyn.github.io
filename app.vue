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
      <ContentNavigation v-slot="{ navigation }">
      <NuxtLink
        v-for="link of navigation"
        :key="link._path"
        :to="link._path"
        active-class="font-bold"
        class="mr-4"
      >
        {{ link.navTitle || link.title }}
      </NuxtLink>
    </ContentNavigation>
    </nav>
    </header>
    <NuxtPage />
  </div>
</template>
