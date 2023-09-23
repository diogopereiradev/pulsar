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
    <h2 class="text-[130px] text-secondary/80 font-[500]">{{ status }}</h2>
    <p class="max-w-[280px] text-center text-[18px] text-primary/50 font-[400]">{{ message }}</p>
    <NuxtLinkLocale 
      :to="redirectPath"
      class="flex items-center min-w-[110px] h-[40px] px-[20px] bg-primary font-[500] rounded-[5px] text-primary mt-[30px]"
    >
      {{ redirectButtonLabel }}
    </NuxtLinkLocale>
  </div>
</template>