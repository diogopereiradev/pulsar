<script setup lang="ts">
defineProps<{ customMessage?: string }>();
</script>

<template>
  <div class="flex flex-col gap-5 justify-center items-center h-screen px-5">
    <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-[50px] text-secondary/80" spin/>
    <h2 class="text-primary/90 text-center font-normal">{{ customMessage? customMessage : $t(`loading.message`) }}</h2>
  </div>
</template>