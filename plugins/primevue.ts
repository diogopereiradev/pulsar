import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import { usePassThrough } from "primevue/passthrough";
import Tailwind from "primevue/passthrough/tailwind";

const StylesWithTailwind = usePassThrough(
  Tailwind,
  {
    dropdown: {
      root: 'border-0 group !bg-secondary/60 hover:bg-secondary/80 shadow',
      input: 'items-center h-[45px] !bg-transparent group-hover:bg-secondary border-0 duration-300',
      trigger: '!bg-transparent group-hover:bg-secondary duration-300',
      wrapper: 'mt-[10px] px-[20px] py-[10px] !bg-secondary/60 !backdrop-blur-lg',
      list: '!flex !flex-col !gap-[8px]',
      item: ({ props, state, context }) => ({
        class: `
          !h-[45px]
          !flex
          !items-center
          ${context.selected ? '!bg-primary hover:!bg-primary/80' : undefined}
          !rounded-[5px]
          hover:!bg-primary/20
          hover:text-primary/80
        `
      })
    }
  } as typeof Tailwind,
  {
    mergeProps: true,
    mergeSections: true
  }
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { 
    unstyled: true,
    ripple: true,
    pt: StylesWithTailwind
  });
});