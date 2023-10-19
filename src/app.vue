<script setup lang="ts">
import { dbUpgradeNeeded } from './database';

onMounted(() => {
  dbUpgradeNeeded();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>./shared/databse