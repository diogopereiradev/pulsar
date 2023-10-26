<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import Dropdown from 'primevue/dropdown';
import MobileMenu from './MobileMenu.vue';
import DonateMenu from './DonateMenu.vue';

const { localeProperties, setLocale } = useI18n();
const selectedLocale = ref<LocaleObject>();
const donateMenuIsOpen = ref(false);

watch(selectedLocale, () => {
  if(selectedLocale?.value) {
    setLocale(selectedLocale.value.code);
  }
});

onMounted(() => {
  selectedLocale.value = localeProperties.value;
});
</script>

<template>
  <nav class="relative w-full flex-col px-7 3xl:px-32 xl:px-10 md:px-12 py-10 z-[80]">
    <div class="w-full flex items-center justify-between">
      <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
      <div class="hidden xl:flex items-center px-7 h-11 bg-secondary/10 rounded-[15px] border border-solid border-primary/20">
        <ul class="flex items-center gap-7">
          <li>
            <NuxtLinkLocale to="/" class="text-primary/90 hover:text-secondary/90 duration-300 font-normal">
              {{ $t('navbar.links-home') }}
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="#" class="text-primary/90 hover:text-secondary/90 duration-300 font-normal">
              {{ $t('navbar.links-documentations') }}
            </NuxtLinkLocale>
          </li>
          <li>
            <a 
              href="https://github.com/FhillSlinger/pulsar" 
              target="_blank" 
              rel="noreferrer" 
              class="text-primary/90 hover:text-secondary/90 duration-300 font-normal"
            >
              Github
            </a>
          </li>
          <li>
            <div class="flex flex-col">
              <button @click="donateMenuIsOpen = true" class="text-primary/90 hover:text-secondary/90 duration-300">
                {{ $t('navbar.links-donate') }}
              </button>
              <DonateMenu :isOpen="donateMenuIsOpen" @update:close="donateMenuIsOpen = false"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="hidden xl:flex items-center gap-2.5">
        <Dropdown 
          class="max-w-[170px] 2xl:max-w-[180px] !h-11 !rounded-[15px] !px-2"
          v-model="selectedLocale"
          :options="$i18n.locales" 
          optionLabel="name"
          :placeholder="$i18n.localeProperties.name"
        />
        <NuxtLinkLocale 
          to="/documentations"
          class="flex items-center justify-center w-[150px] 2xl:w-[160px] h-11 text-primary font-normal bg-primary/80 hover:bg-primary/60 hover:text-primary/90 duration-300 border-none rounded-[15px]"
        >
          {{ $t('navbar.getting-started-button') }}
        </NuxtLinkLocale>
      </div>
      <MobileMenu />
    </div>
    <hr class="radial-separator mt-7"/>
  </nav>
</template>

<style scoped>
  .radial-separator {
    width: 100%;
    height: 1px;
    border: none;
    background: rgb(25,29,43);
    background: radial-gradient(circle, rgba(25,29,43,1) 43%, rgba(15,17,27,1) 100%);
  }
</style>