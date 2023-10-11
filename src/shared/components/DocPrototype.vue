<script setup lang="ts">
import { IDocumentation } from '~/shared/storage/models/Documentation';
defineProps<Pick<IDocumentation, 'colors' | 'features'>>();
</script>

<template>
  <div class="flex flex-col w-[270px] h-[330px] rounded-[10px] duration-300" :style="{ backgroundColor: colors.background }">
    <!--Navbar-->
    <div class="flex flex-col w-full p-[20px]">
      <div class="w-full flex justify-between">
        <div class="w-[35px] h-[15px] rounded-[2px] duration-300" :style="{ backgroundColor: colors.text }"></div>
        <div class="w-[50px] h-[15px] rounded-[2px] duration-300" :style="{ backgroundColor: colors.primary }"></div>
      </div>
      <hr class="w-full h-[1px] border-none mt-[15px] duration-300" :style="{ backgroundColor: colors.divider }" />
    </div>
    <div class="flex w-full h-full px-[10px]">
      <!--Left menu-->
      <div class="flex flex-col min-w-[65px] h-full py-[10px]">
        <div class="w-[40px] h-[10px] rounded-[2px] duration-300 ml-[10px]" :style="{ backgroundColor: colors.text }"></div>
        <div class="highlight w-[50px] h-[10px] rounded-[2px] mt-[10px] ml-[10px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[50px] h-[10px] rounded-[2px] mt-[10px] ml-[10px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[45px] h-[10px] rounded-[2px] mt-[10px] ml-[10px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[50px] h-[10px] rounded-[2px] mt-[10px] ml-[10px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="w-[40px] h-[10px] rounded-[2px] mt-[20px] duration-300 ml-[10px]" :style="{ backgroundColor: colors.text }"></div>
        <div class="highlight w-[45px] h-[10px] rounded-[2px] mt-[10px] ml-[10px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[50px] h-[10px] rounded-[2px] mt-[10px] ml-[10px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[35px] h-[10px] rounded-[2px] mt-[10px] ml-[10px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
      </div>
      <!--Center content-->
      <div :class="`${features.indexesTable? 'w-[140px]' : 'w-full'} h-full duration-300`">
        <div class="flex flex-col px-[30px] py-[10px]">
          <div class="w-[70%] h-[15px] rounded-[2px] duration-300" :style="{ backgroundColor: colors.text }"></div>
          <div class="w-[90%] h-[30px] rounded-[2px] mt-[10px] duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
          <div class="w-[90%] h-[20px] rounded-[2px] mt-[10px] duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
          <div class="w-[90%] h-[30px] rounded-[2px] mt-[10px] duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
          <div class="w-[70%] h-[15px] rounded-[2px] duration-300 mt-[15px]" :style="{ backgroundColor: colors.text }"></div>
          <div class="w-[90%] h-[20px] rounded-[2px] mt-[10px] duration-300" :style="{ backgroundColor: colors.text + '40' }"></div>
        </div>
      </div>
      <!--Right menu-->
      <div :class="`${features.indexesTable? 'w-[65px]' : 'hidden'} h-full py-[10px] duration-300`">
        <div class="w-[40px] h-[10px] rounded-[2px] duration-300" :style="{ backgroundColor: colors.text }"></div>
        <div class="highlight w-[35px] h-[10px] rounded-[2px] mt-[7px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[45px] h-[10px] rounded-[2px] mt-[7px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[35px] h-[10px] rounded-[2px] mt-[7px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[55px] h-[10px] rounded-[2px] mt-[7px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[25px] h-[10px] rounded-[2px] mt-[7px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
        <div class="highlight w-[45px] h-[10px] rounded-[2px] mt-[7px] duration-300 cursor-pointer" :style="{ backgroundColor: colors.text + '40' }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .highlight:hover {
    background-color: v-bind('colors.primary + "a9"') !important;
  }
</style>