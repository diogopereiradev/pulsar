<script setup lang="ts">
defineProps<{ 
  status: number, 
  message: string,
  redirectButtonLabel: string,
  redirectPath: string
}>();
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <h2 class="text-[130px] text-secondary/80 font-medium">{{ status }}</h2>
    <p class="max-w-[280px] text-center text-lg text-primary/50 font-normal">{{ message }}</p>
    <NuxtLinkLocale 
      :to="redirectPath"
      class="flex items-center min-w-[110px] h-10 px-5 bg-primary font-medium rounded-md text-primary mt-7"
    >
      {{ redirectButtonLabel }}
    </NuxtLinkLocale>
  </div>
</template>