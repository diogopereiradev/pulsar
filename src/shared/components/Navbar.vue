<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';
import AppIcon from './icons/AppIcon.vue';
import Dropdown from 'primevue/dropdown';

const { localeProperties, setLocale } = useI18n();
const selectedLocale = ref<LocaleObject>();

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
  <nav class="relative w-full flex justify-between gap-12 items-center backdrop-blur-lg px-7 md:px-12 py-10 z-[80]">
    <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
    <Dropdown 
      class="max-w-[215px]"
      v-model="selectedLocale"
      :options="$i18n.locales" 
      optionLabel="name"
      :placeholder="$i18n.localeProperties.name"
    />
  </nav>
</template>