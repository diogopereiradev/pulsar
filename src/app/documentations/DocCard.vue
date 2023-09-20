<script setup lang="ts">
import DocPrototype from './DocPrototype.vue';
import { IDocumentation } from '~/shared/storage/models/Documentation';
defineProps<IDocumentation>();
</script>

<template>
  <div class="grow w-[370px] min-h-[300px] bg-secondary/80 backdrop-blur-lg rounded-[7px] cursor-pointer">
    <div class="flex justify-center pt-[20px] w-full h-[140px] bg-secondary/20 backdrop-contrast-[1.40] rounded-t-[7px] overflow-hidden">
      <DocPrototype
        :colors="colors"
        :features="features"
      />
    </div>
    <div class="flex flex-col p-[30px]">
      <div class="flex items-center justify-between">
        <h2 :title="title" class="max-w-[100px] text-[20px] text-primary/90 font-[500] truncate">{{ title }}</h2>
        <p class="relative text-[15px] text-primary/50 font-[500]">{{ $d(createdAt, 'long') }}</p>
      </div>
      <p 
        :title="description" 
        class="text-[16px] text-primary/60 font-[400] mt-[20px] break-all"
      >
        {{ description.length > 105? description.slice(0, 105) + '...' : description }}
      </p>
    </div>
  </div>
</template>