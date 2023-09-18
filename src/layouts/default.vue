<script setup lang="ts">
import AppHead from '~/shared/components/AppHead.vue';
import Navbar from '~/shared/components/Navbar.vue';
</script>

<template>
  <AppHead />
  <Navbar />
  <slot />
</template>