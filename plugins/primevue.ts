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
      input: 'items-center h-11 text-primary/80 !bg-transparent group-hover:bg-secondary border-0 duration-300',
      trigger: '!bg-transparent group-hover:bg-secondary duration-300',
      wrapper: 'mt-2.5 px-5 py-2.5 !bg-secondary/60 !backdrop-blur-lg !rounded-[13px]',
      list: '!flex !flex-col !gap-2 text-primary/80',
      item: ({ props, state, context }) => ({
        class: `
          !h-[45px]
          !flex
          !items-center
          ${context.selected ? '!bg-primary hover:!bg-primary/80' : undefined}
          !rounded-[10px]
          !text-primary
          hover:!bg-primary/20
          hover:text-primary/80
        `
      })
    },
    toolbar: {
      root: '!bg-secondary/60 !backdrop-blur-lg border-0 px-9 shadow'
    },
    inputtext: {
      root: 'w-full h-10 !bg-secondary/10 !border-1 !border-primary/30 !text-primary/80 placeholder:text-primary/30 focus:!border-primary/50 focus:!shadow-none duration-300'
    },
    button: {
      root: 'justify-center items-center bg-secondary/10 hover:bg-primary/80 !p-0 !border-1 !border-primary/30 focus:!shadow-none'
    },
    textarea: {
      root: 'w-full max-h-[130px] rounded-md !bg-secondary/10 !text-primary/80 placeholder:text-primary/30 !border-1 !border-primary/30 focus:!border-primary/50 focus:!shadow-none duration-300'
    },
    scrollpanel: {
      root: '!w-full',
      wrapper: 'w-auto',
      barY: 'ml-10 !bg-secondary/30 contrast-200'
    },
    inputswitch: {
      slider: ({ props }) => ({
        class: props.modelValue? '!bg-primary' : '!bg-[#404040]'
      })
    },
    colorpicker: {
      input: 'w-full !shadow-none !rounded-t-[5px] hover:!border-primary/80',
      panel: '!z-[9999] !rounded-t-[5px] !bg-transparent !shadow-none',
      content: '!rounded-[5px]',
      selector: '!rounded-[5px]',
      color: '!rounded-[5px]',
      hue: '!rounded-[5px]',
      hueHandle: ''
    },
    paginator: {
      root: '!bg-transparent !backdrop-blur-lg border-0 px-9 shadow-none',
      pageButton: ({ props, state, context }) => ({
        class: `${context.active? '!bg-primary' : '!bg-transparent'} !shadow-none`
      })
    },
    contextmenu: {
      root: '!bg-secondary',
      menuitem: '!font-medium [&_span]:text-primary/80 duration-300'
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