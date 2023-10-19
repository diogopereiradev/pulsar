<script setup lang="ts">
import { IDocumentation } from '~/database/models/Documentation';
defineProps<Pick<IDocumentation, 'colors' | 'features'> & {
  navbar?: boolean,
  selectedRegion?: 'left' | 'right' | 'top' | 'bottom'
}>();
</script>

<template>
  <div class="flex flex-col w-[270px] h-[330px] rounded-lg duration-300" :style="{ backgroundColor: colors.background }">
    <!--Top selected region item-->
    <div v-if="selectedRegion === 'top'" class="px-4 pt-4">
      <div class="pulse w-full h-[30px] rounded-lg" :style="{ backgroundColor: colors.primary + '60' }"></div>
    </div>
    <!--Navbar-->
    <div v-if="navbar" class="flex flex-col w-full p-5">
      <div class="w-full flex justify-between">
        <div class="w-9 h-3.5 rounded-sm duration-300" :style="{ backgroundColor: colors.text }"></div>
        <div class="w-12 h-3.5 rounded-sm duration-300" :style="{ backgroundColor: colors.primary }"></div>
      </div>
      <hr class="w-full h-px border-none mt-3.5 duration-300" :style="{ backgroundColor: colors.divider }" />
    </div>
    <div :class="`flex w-full h-full p-2.5 ${!navbar && 'mt-2.5'}`">
      <!--Left selected region item-->
      <div v-if="selectedRegion === 'left'" class="pt-2.5">
        <div class="pulse min-w-[30px] h-full rounded-lg" :style="{ backgroundColor: colors.primary + '60' }"></div>
      </div>
      <!--Left menu-->
      <div class="flex flex-col min-w-[65px] h-full py-2.5">
        <div class="w-10 h-2.5 rounded-sm duration-300 ml-2.5" :style="{ backgroundColor: colors.text }"></div>
        <div class="highlight w-12 h-2.5 rounded-sm mt-2.5 ml-2.5 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-12 h-2.5 rounded-sm mt-2.5 ml-2.5 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-11 h-2.5 rounded-sm mt-2.5 ml-2.5 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-12 h-2.5 rounded-sm mt-2.5 ml-2.5 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="w-10 h-2.5 rounded-sm mt-5 duration-300 ml-2.5" :style="{ backgroundColor: colors.text }"></div>
        <div class="highlight w-11 h-2.5 rounded-sm mt-2.5 ml-2.5 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-12 h-2.5 rounded-sm mt-2.5 ml-2.5 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-9 h-2.5 rounded-sm mt-2.5 ml-2.5 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
      </div>
      <!--Center content-->
      <div :class="`${features.indexesTable? 'w-36' : 'w-full'} h-full duration-300`">
        <div class="flex flex-col px-7 py-2.5">
          <div class="w-3/4 h-3.5 rounded-sm duration-300" :style="{ backgroundColor: colors.text }"></div>
          <div class="w-11/12 h-7 rounded-sm mt-2.5 duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
          <div class="w-11/12 h-5 rounded-sm mt-2.5 duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
          <div class="w-11/12 h-7 rounded-sm mt-2.5 duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
          <div class="w-3/4 h-3.5 rounded-sm duration-300 mt-3.5" :style="{ backgroundColor: colors.text }"></div>
          <div class="w-11/12 h-5 rounded-sm mt-2.5 duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
        </div>
      </div>
      <!--Right menu-->
      <div :class="`${features.indexesTable? 'w-16' : 'hidden'} h-full py-2.5 duration-300`">
        <div class="w-10 h-2.5 rounded-sm duration-300" :style="{ backgroundColor: colors.text }"></div>
        <div class="highlight w-9 h-2.5 rounded-sm mt-2 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-11 h-2.5 rounded-sm mt-2 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-9 h-2.5 rounded-sm mt-2 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-14 h-2.5 rounded-sm mt-2 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[25px] h-2.5 rounded-sm mt-2 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-11 h-2.5 rounded-sm mt-2 duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
      </div>
      <!--Right selected region item-->
      <div v-if="selectedRegion === 'right'" class="pl-2.5 pt-2.5">
        <div class="pulse min-w-[30px] h-full rounded-lg" :style="{ backgroundColor: colors.primary + '60' }"></div>
      </div>
    </div>
    <!--Bottom selected region item-->
    <div v-if="selectedRegion === 'bottom'" class="px-4 pb-4">
      <div class="pulse w-full h-[30px] rounded-lg" :style="{ backgroundColor: colors.primary + '60' }"></div>
    </div>
  </div>
</template>

<style scoped>
  .highlight:hover {
    background-color: v-bind('colors.primary + "a9"') !important;
  }

  .pulse {
    animation: pulsing-animation 2s linear infinite;
  }

  @keyframes pulsing-animation {
    0% {
      background-color: v-bind('colors.primary + "80"');
    }
    50% {
      background-color: v-bind('colors.primary + "40"');
    }
    100% {
      background-color: v-bind('colors.primary + "80"');
    }
  }
</style>~/shared/databse/models/Documentation