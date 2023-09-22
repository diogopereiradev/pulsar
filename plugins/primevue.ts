import { defineNuxtPlugin } from "#app";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import ConfirmationService from 'primevue/confirmationservice';
import { usePassThrough } from "primevue/passthrough";
import Tailwind from "primevue/passthrough/tailwind";

const StylesWithTailwind = usePassThrough(
  Tailwind,
  {
    dropdown: {
      root: 'border-0 group !bg-secondary/60 hover:bg-secondary/80 shadow',
      input: 'items-center h-[45px] text-primary/80 !bg-transparent group-hover:bg-secondary border-0 duration-300',
      trigger: '!bg-transparent group-hover:bg-secondary duration-300',
      wrapper: 'mt-[10px] px-[20px] py-[10px] !bg-secondary/60 !backdrop-blur-lg',
      list: '!flex !flex-col !gap-[8px] text-primary/80',
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
    },
    toolbar: {
      root: '!bg-secondary/60 !backdrop-blur-lg border-0 px-[35px] shadow'
    },
    inputtext: {
      root: 'w-full h-[40px] !bg-secondary/10 !border-1 !border-primary/30 placeholder:text-primary/30 focus:!border-primary/50 focus:!shadow-none duration-300'
    },
    button: {
      root: 'justify-center items-center bg-secondary/10 hover:bg-primary/80 !p-0 !border-1 !border-primary/30 focus:!shadow-none'
    },
    textarea: {
      root: 'w-full max-h-[130px] rounded-[5px] !bg-secondary/10 placeholder:text-primary/30 !border-1 !border-primary/30 focus:!border-primary/50 focus:!shadow-none duration-300'
    },
    scrollpanel: {
      root: '!w-full',
      wrapper: 'w-auto',
      barY: 'ml-[40px] !bg-secondary/30 contrast-200'
    },
    inputswitch: {
      slider: ({ props }) => ({
        class: props.modelValue? '!bg-primary' : '!bg-[#404040]'
      })
    },
    colorpicker: {
      input: 'w-full !shadow-none hover:!border-primary/80',
      panel: '!z-[9999]',
      hueHandle: ''
    },
    paginator: {
      root: '!bg-transparent !backdrop-blur-lg border-0 px-[35px] shadow-none',
      pageButton: ({ props, state, context }) => ({
        class: `${context.active? '!bg-primary' : '!bg-transparent'} !shadow-none`
      })
    },
    contextmenu: {
      root: '!bg-secondary',
      menuitem: '!font-[500] [&_span]:text-primary/80 duration-300'
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
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.component('Button', Button);
});