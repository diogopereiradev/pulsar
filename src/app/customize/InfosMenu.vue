<script setup lang="ts">
import { useCustomize } from '~/shared/states/customizeState';
import { documentationDataEmptyObj } from '~/@types/utils/documentation';

const customize = useCustomize();
</script>

<template>
  <div :class="`${customize.controlsMenu.infosMenu.isOpen? '' : 'opacity-0 pointer-events-none'} duration-300 fixed left-0 top-0 z-[9999]`">
    <!--Frame-->
    <div class="fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 w-full lg:w-[650px] h-screen lg:h-[400px] bg-secondary lg:rounded-[10px] duration-300 z-[9999]">
      <!--Title-->
      <div class="flex items-center justify-between px-9 py-7">
        <div class="flex items-center gap-3.5">
          <div class="flex justify-center items-center min-w-[32px] h-8 rounded-full border-[3px] border-white/60">
            <font-awesome-icon icon="fa-solid fa-info" class="text-primary/80 text-[15px] -mt-0.5"></font-awesome-icon>
          </div>
          <h3 class="text-[19px] text-primary/80 font-medium">{{ $t('customize.customization-informations-menu-title') }}</h3>
        </div>
        <div class="flex items-center gap-1">
          <button @click="customize.controlsMenu.infosMenu.isOpen = false">
            <font-awesome-icon icon="fa-solid fa-close" class="text-primary/70 text-[21px]"></font-awesome-icon>
          </button>
        </div>
      </div>
      <hr class="radial-separator w-full min-h-[1px]"/>
      <div class="relative flex flex-col max-h-[82vh] lg:max-h-[none] lg:flex-row overflow-y-scroll lg:overflow-visible">
        <!--About customizations-->
        <div class="w-full lg:max-w-[47%] break-words px-9 py-8">
          <div class="flex items-center gap-2.5">
            <font-awesome-icon icon="fa-regular fa-circle-question" class="text-primary/80 text-[20px] -mt-0.5"></font-awesome-icon>
            <h3 class="text-[16px] text-primary/80 font-medium">{{ $t('customize.customization-informations-menu-what-thats-do-title') }}</h3>
          </div>
          <p class="text-primary/[0.45] mt-3">{{ $t('customize.customization-informations-menu-what-thats-do-description') }}</p>
        </div>
        <hr class="radial-separator lg:hidden w-full min-h-[1px] -mb-3"/>
        <!--Reserved functions and style variables-->
        <div class="flex flex-col w-full lg:w-[53%] lg:max-h-[310px] lg:overflow-y-scroll break-words px-9 lg:px-5 py-8">
          <div class="w-full flex items-center gap-2.5">
            <font-awesome-icon icon="fa-solid fa-microchip" class="text-primary/80 text-[20px] -mt-0.5"></font-awesome-icon>
            <h3 class="text-[16px] text-primary/80 font-medium">{{ $t('customize.customization-informations-menu-reserved-functions-title') }}</h3>
          </div>
          <!--Open navigation menu-->
          <hr class="radial-separator w-full min-h-[1px] my-4"/>
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center justify-between gap-2.5">
              <h3 class="text-[16px] text-primary/70 font-medium">{{ $t('customize.customization-informations-menu-open-navigation-menu-title') }}</h3>
              <div class="flex items-center justify-center px-3 py-1 bg-[#5786cc]/20 rounded-[10px]">
                <p class="text-[#5886dd]">{{ $t('customize.customization-informations-menu-command-word') }}</p>
              </div>
            </div>
            <p class="text-[15px] text-primary/40 mb-1">{{ $t('customize.customization-informations-menu-open-navigation-menu-description') }}</p>
            <p class="flex items-center gap-3 w-full h-10 bg-secondary_darken backdrop-contrast-225 overflow-x-scroll rounded-[10px] px-5">
              <font-awesome-icon icon="fa-solid fa-terminal" class="text-primary/70 text-[18px]"></font-awesome-icon>
              <hr class="radial-separator w-px h-[85%]"/>
              <span class="text-[#70c25b]">
                pulsar_openNavigation<span class="text-primary">()</span>
                <span class="text-primary">;</span>
              </span>
            </p>
          </div>
          <!--Navigate to-->
          <hr class="radial-separator w-full min-h-[1px] mt-6 mb-4"/>
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center justify-between gap-2.5">
              <h3 class="text-[16px] text-primary/70 font-medium">{{ $t('customize.customization-informations-menu-navigate-to-title') }}</h3>
              <div class="flex items-center justify-center px-3 py-1 bg-[#5786cc]/20 rounded-[10px]">
                <p class="text-[#5886dd]">{{ $t('customize.customization-informations-menu-command-word') }}</p>
              </div>
            </div>
            <p class="text-[15px] text-primary/40 mb-1">{{ $t('customize.customization-informations-menu-navigate-to-description') }}</p>
            <p class="flex items-center gap-3 w-full h-10 bg-secondary_darken backdrop-contrast-225 overflow-x-scroll rounded-[10px] px-5">
              <font-awesome-icon icon="fa-solid fa-terminal" class="text-primary/70 text-[18px]"></font-awesome-icon>
              <hr class="radial-separator min-w-[1px] h-[85%]"/>
              <span class="text-[#70c25b]">
                pulsar_navigateTo<span class="text-primary">(<span class="text-[#d8b15c]">routeName</span>)</span>
                <span class="text-primary">;</span>
              </span>
            </p>
          </div>
          <!--Colors-->
          <hr class="radial-separator w-full min-h-[1px] mt-6 mb-4"/>
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center justify-between gap-2.5">
              <h3 class="text-[16px] text-primary/70 font-medium">{{ $t('customize.customization-informations-menu-colors-title') }}</h3>
              <div class="flex items-center justify-center px-3 py-1 bg-[#9d58dd]/20 rounded-[10px]">
                <p class="text-[#9d58dd]">{{ $t('customize.customization-informations-menu-style-word') }}</p>
              </div>
            </div>
            <p class="text-[15px] text-primary/40 mb-1">{{ $t('customize.customization-informations-menu-colors-description') }}</p>
            <p class="flex items-center gap-3 w-full h-10 bg-secondary_darken backdrop-contrast-225 overflow-x-scroll rounded-[10px] px-5">
              <font-awesome-icon icon="fa-solid fa-palette" class="text-primary/70 text-[18px]"></font-awesome-icon>
              <hr class="radial-separator min-w-[1px] h-[85%]"/>
              <span class="relative text-[#d8b15c] max-w-[100px] whitespace-nowrap">{{ Object.keys(documentationDataEmptyObj.colors).join(', ') }}</span>
            </p>
          </div>
          <!--Examples-->
          <hr class="radial-separator w-full min-h-[1px] mt-6 mb-4"/>
          <h3 class="text-[16px] text-primary/70 font-medium mb-2">{{ $t('customize.customization-informations-menu-use-examples-title') }}</h3>
          <div class="relative flex flex-col gap-2 w-full min-h-[160px] bg-[#22325591] border-l-[3px] border-[#2e416b] rounded-[10px] py-5 px-5 mt-1">
            <h3 class="text-[15px] text-primary/70 font-medium">{{ $t('customize.customization-informations-menu-command-example-title') }}</h3>
            <p class="flex flex-col w-full min-h-[90px] bg-secondary overflow-x-scroll rounded-[10px] px-3 py-[9px]">
              <span class="flex items-center text-primary/80">
                &lt;
                <span class="flex items-center text-[#9370e4]">
                  button
                  <span class="text-[#70c25b] ml-1.5">onclick</span>
                  <span class="text-[#9370e4]">=</span>
                  <span class="text-[#86cf74]">"</span>
                  <span class="text-[#86cf74]">pulsar_openNavigation()</span>
                  <span class="text-[#86cf74]">"</span>
                </span>
                &gt;
              </span>
              <span class="text-primary/80 ml-4">
                Example button
              </span>
              <span class="flex items-center text-primary/80">
                &lt;
                <span class="-ml-[1px]">/</span>
                <span class="flex items-center text-[#9370e4]">
                  button
                </span>
                &gt;
              </span>
            </p>
          </div>
          <hr class="radial-separator w-full min-h-[1px] mt-6 mb-4"/>
          <div class="relative flex flex-col gap-2 w-full min-h-[160px] bg-[#9370e4]/10 border-l-[3px] border-[#9370e4] rounded-[10px] py-5 px-5 mt-1">
            <h3 class="text-[15px] text-primary/70 font-medium">{{ $t('customize.customization-informations-menu-style-example-title') }}</h3>
            <p class="flex flex-col w-full min-h-[90px] bg-secondary overflow-x-scroll rounded-[10px] px-3 py-[9px]">
              <span class="flex items-center text-primary/80">
                .
                <span class="flex items-center text-[#9370e4]">
                  foo
                  <span class="text-primary/80 ml-1.5">{</span>
                </span>
              </span>
              <span class="flex flex-nowrap items-center ml-2">
                <span class="text-[#99d2f9] whitespace-nowrap">background-color:</span>
                <span class="text-[#9370e4]">var</span>
                <span class="text-primary/80">(</span>
                <span class="text-[#9370e4]">--primary</span>
                <span class="text-primary/80">);</span>
              </span>
              <span class="text-primary/80">}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--Backdrop-->
    <div
      @click="customize.controlsMenu.infosMenu.isOpen = false" 
      class="fixed left-0 top-0 w-screen h-screen bg-black/50 z-[9998]">
    </div>
  </div>
</template>

<style scoped>
  .hljs {
    display: initial !important;
    background-color: transparent !important;
    padding: 0px !important;
  }
  .radial-separator {
    border: none;
    background: rgb(25,29,43);
    background: radial-gradient(circle, rgb(35, 40, 59) 43%, rgba(25,29,43,1) 100%);
  }
</style>