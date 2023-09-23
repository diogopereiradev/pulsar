<script setup lang="ts">
import AppHead from '~/shared/components/AppHead.vue';
</script>

<template>
  <AppHead />
  <div class="max-w-[2120px] mx-auto">
    <slot />
  </div>
</template>