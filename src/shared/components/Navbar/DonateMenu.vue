<script setup lang="ts">
import { useNavbar } from '~/shared/states/navbarState';
import BuyMeACoffeIcon from '../icons/BuyMeACoffeIcon.vue';

const navbar = useNavbar();

function copyPix() {
  window.navigator.clipboard.writeText('diogopereira.conta.pix@gmail.com');
  navbar.value.donateMenu.isCopiedPix = true;
}

watch(() => navbar.value.donateMenu.isCopiedPix, (newIsCopied) => {
  if(!newIsCopied) return;

  if(navbar.value.donateMenu.isCopiedTimer) clearTimeout(navbar.value.donateMenu.isCopiedTimer);
  navbar.value.donateMenu.isCopiedTimer = setTimeout(() => {
    navbar.value.donateMenu.isCopiedPix = false;
  }, 1500);
});

onMounted(() => {
  window.addEventListener('keyup', e => {
    if(e.key === 'Escape' && navbar.value.donateMenu.isOpen) {
      navbar.value.donateMenu.isOpen = false;
    }
  });
});
</script>

<template>
  <div>
    <div 
      :class="`
        ${navbar.donateMenu.isOpen? '' : 'opacity-0 pointer-events-none'}
        fixed
        left-[50%]
        top-[50%]
        translate-x-[-50%]
        translate-y-[-50%]
        flex
        gap-5
        w-[800px]
        h-[450px]
        bg-secondary
        rounded-[15px]
        duration-300
        p-10
        z-[9999]
      `"
    >
      <a
        href="https://www.buymeacoffee.com/diogopereiy"
        target="_blank"
        rel="noreferrer"
        class="group block w-[350px] h-full rounded-[15px] hover:-translate-y-3 duration-300 cursor-pointer"
      >
        <div class="relative flex flex-col items-center w-full h-[70%] bg-secondary_darken group-hover:bg-[#dbd57b] rounded-t-[15px] duration-300 pt-10">
          <BuyMeACoffeIcon
            color="#d3d3d3"
            class="w-[100px] group-hover:!fill-secondary_darken duration-300"
          />
          <p class="absolute bottom-10 px-10 text-center text-primary/70 group-hover:text-darken mt-10">
            {{ $t('navbar.donate-buy-me-a-coffe-description') }}
          </p>
        </div>
        <div class="flex items-center justify-center w-full h-[30%] bg-secondary_darken/40 rounded-b-[15px]">
          <button class="flex items-center gap-2.5 bg-[#c2bb59] text-darken rounded-[15px] px-6 h-12">
            <BuyMeACoffeIcon
              color="#131524"
              class="w-[40px]"
            />
            Buy me a coffe
          </button>
        </div>
      </a>
      <div
        @click="copyPix()"
        class="group block w-[350px] h-full rounded-[15px] hover:-translate-y-3 duration-300 cursor-pointer"
      >
        <div class="relative flex flex-col items-center w-full h-[70%] bg-secondary_darken group-hover:bg-[#70cf64] rounded-t-[15px] duration-300 pt-10">
          <font-awesome-icon icon="fa-brands fa-pix" class="text-primary group-hover:text-darken text-[57px] duration-300"></font-awesome-icon>
          <p class="absolute bottom-10 px-8 text-center text-primary/70 group-hover:text-darken mt-10">
            {{ $t('navbar.donate-pix-description') }}
          </p>
        </div>
        <div class="flex items-center justify-center w-full h-[30%] bg-secondary_darken/40 rounded-b-[15px]">
          <button class="flex items-center gap-2.5 bg-[#70cf64] text-darken rounded-[15px] px-5 h-12 duration-300">
            {{ navbar.donateMenu.isCopiedPix? $t('navbar.pix-copied') : 'diogopereira.conta.pix@gmail.com' }}
          </button>
        </div>
      </div>
    </div>
    <div 
      @click="navbar.donateMenu.isOpen = false" 
      :class="`
        ${navbar.donateMenu.isOpen? '' : 'opacity-0 pointer-events-none'} 
        fixed 
        left-0 
        top-0 
        w-screen 
        h-screen 
        bg-black/40 
        duration-300 
        z-[9998]
      `"
    ></div>
  </div>
</template>