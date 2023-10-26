<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
import Dropdown from 'primevue/dropdown';

const { localeProperties, setLocale } = useI18n();
const selectedLocale = ref<LocaleObject>();
const mobileMenuIsOpen = ref(false);

function openMobileMenu() {
  mobileMenuIsOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenuIsOpen.value = false;
  document.body.style.overflow = 'auto';
}

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
  <div class="xl:hidden">
    <Button
      @click="openMobileMenu()"
      class="border-none !px-3 !py-2"
    >
      <font-awesome-icon icon="fa-solid fa-bars" class="text-primary text-3xl"></font-awesome-icon>
    </Button>
    <div 
      :class="`
        ${mobileMenuIsOpen? '' : 'opacity-0 pointer-events-none'} 
        flex 
        flex-col 
        gap-3 
        fixed 
        right-10 
        top-10 
        w-56 
        min-h-[100px] 
        rounded-[15px] 
        duration-300 
        bg-secondary 
        px-7 
        py-8 
        z-[9999]
      `"
    >
      <Dropdown 
        class="max-w-[170px] !h-11 !rounded-[15px] !px-2 !bg-secondary_darken/70"
        v-model="selectedLocale"
        :options="$i18n.locales" 
        optionLabel="name"
        :placeholder="$i18n.localeProperties.name"
      />
      <NuxtLinkLocale 
        to="/documentations"
        class="flex items-center justify-center w-full h-11 text-primary font-normal bg-primary/80 hover:bg-primary/60 hover:text-primary/90 duration-300 border-none rounded-[15px]"
      >
        Getting Started
      </NuxtLinkLocale>
      <hr class="bg-secondary_darken w-[95%] mx-auto h-px border-none mt-3"/>
      <div>
        <ul class="flex flex-col gap-2 px-3">
          <li>
            <NuxtLinkLocale to="/" class="block text-primary/90 hover:text-secondary/90 duration-300 font-normal w-full py-1">
              Home
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="#" class="block text-primary/90 hover:text-secondary/90 duration-300 font-normal w-full py-1">
              Documentations
            </NuxtLinkLocale>
          </li>
          <li>
            <a 
              href="https://github.com/FhillSlinger/pulsar" 
              target="_blank" 
              rel="noreferrer" 
              class="block text-primary/90 hover:text-secondary/90 duration-300 font-normal w-full py-1"
            >
              Github
            </a>
          </li>
          <li>
            <button class="text-left text-primary/90 hover:text-secondary/90 duration-300 w-full py-1">
              Donate
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      @click="closeMobileMenu()"
      :class="`${mobileMenuIsOpen? '' : 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen duration-300 bg-black/30 z-[9998]`"
    ></div>
  </div>
</template>