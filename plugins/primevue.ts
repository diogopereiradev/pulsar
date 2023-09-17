import { defineNuxtPlugin } from '#app';
import { usePassThrough } from 'primevue/passthrough';
import PrimeVue from 'primevue/config';
import Tailwind from "primevue/passthrough/tailwind";

export default defineNuxtPlugin((nuxtApp) => {
  const CustomComponentsTheme = usePassThrough(Tailwind,
    {
      
    } as typeof Tailwind,
    {
      mergeProps: true,
      mergeSections: true
    }
  );
  
  nuxtApp.vueApp.use(PrimeVue, { 
    ripple: true,
    pt: CustomComponentsTheme
  });
});