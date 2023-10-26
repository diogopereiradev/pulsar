<script setup lang="ts">
import AppHead from '~/shared/components/AppHead.vue';
import Navbar from '~/shared/components/Navbar/Navbar.vue';
</script>

<template>
  <AppHead />
  <Navbar />
  <div class="max-w-[2120px] mx-auto">
    <slot />
  </div>
</template>