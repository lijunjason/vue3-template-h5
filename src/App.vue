<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="store.cachedViews">
      <component :is="Component" :key="$route.fullPath" />
    </KeepAlive>
  </RouterView>
</template>
<script setup lang="ts">
import { useKeepAlive } from '@/store';
const store = useKeepAlive();
</script>
