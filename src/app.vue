<script setup lang="ts">
import { dbUpgradeNeeded } from './shared/storage';

onMounted(() => {
  dbUpgradeNeeded();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>./shared/storage