<script setup lang="ts">
import BuyMeACoffeIcon from '~/shared/components/icons/BuyMeACoffeIcon.vue';
import Dropdown from 'primevue/dropdown';
import { useNavbar } from '~/shared/states/navbarState';

const { localeProperties, setLocale } = useI18n();
const navbar = useNavbar();

function openMobileMenu() {
  navbar.value.mobileMenuIsOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  navbar.value.mobileMenuIsOpen = false;
  document.body.style.overflow = 'auto';
}


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

watch(() => navbar.value.selectedLocale, () => {
  if(navbar.value.selectedLocale) {
    setLocale(navbar.value.selectedLocale.code);
  }
});

onMounted(() => {
  navbar.value.selectedLocale = localeProperties.value;
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
        ${navbar.mobileMenuIsOpen? '' : 'opacity-0 pointer-events-none'} 
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
        v-model="navbar.selectedLocale"
        :options="$i18n.locales" 
        optionLabel="name"
        :placeholder="$i18n.localeProperties.name"
      />
      <NuxtLinkLocale 
        to="/documentations"
        :class="`${$route.path.match('/documentations')? 'hidden' : 'flex'} items-center justify-center w-full h-11 text-primary font-normal bg-primary/80 hover:bg-primary/60 hover:text-primary/90 duration-300 border-none rounded-[15px]`"
      >
        {{ $t('navbar.getting-started-button') }}
      </NuxtLinkLocale>
      <hr class="bg-secondary_darken w-[95%] mx-auto h-px border-none mt-3"/>
      <div>
        <ul class="flex flex-col gap-2 px-3">
          <li>
            <NuxtLinkLocale to="/" class="block text-primary/90 hover:text-secondary/90 duration-300 font-normal w-full py-1">
              {{ $t('navbar.links-home') }}
            </NuxtLinkLocale>
          </li>
          <li>
            <a
              href="https://github.com/FhillSlinger/pulsar"
              target="_blank"
              rel="noreferrer"
              class="block text-primary/90 hover:text-secondary/90 duration-300 font-normal w-full py-1"
            >
              {{ $t('navbar.links-documentations') }}
            </a>
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
            <button @click="navbar.donateMenu.isOpen = true" class="text-left text-primary/90 hover:text-secondary/90 duration-300 w-full py-1">
              {{ $t('navbar.links-donate') }}
            </button>
          </li>
        </ul>
      </div>
      <div :class="`${navbar.donateMenu.isOpen? '' : 'opacity-0 pointer-events-none'} absolute left-0 top-0 w-full h-full bg-secondary rounded-[15px] duration-300`">
        <button @click="navbar.donateMenu.isOpen = false" class="absolute right-6 top-6">
          <font-awesome-icon icon="fa-solid fa-close" class="text-[20px] text-primary/70"></font-awesome-icon>
        </button>
        <ul class="w-full flex flex-col gap-3 p-6 mt-14">
          <li>
            <a
              href="https://www.buymeacoffee.com/diogopereiy"
              target="_blank"
              rel="noreferrer"
              class="text-left w-full h-11 flex items-center gap-0.5 bg-[#c2bb59] rounded-[15px] px-1"
            >
              <BuyMeACoffeIcon
                class="w-[45px] !fill-secondary_darken"
              />
              Buy me a coffe
            </a>
          </li>
          <li>
            <button @click="copyPix()" class="text-left w-full h-11 flex items-center gap-4 bg-[#70cf64] rounded-[15px] px-4">
              <font-awesome-icon icon="fa-brands fa-pix" class="text-darken text-[20px] duration-300"></font-awesome-icon>
              {{ navbar.donateMenu.isCopiedPix? $t('navbar.pix-copied') : 'Pix' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      @click="closeMobileMenu()"
      :class="`${navbar.mobileMenuIsOpen? '' : 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen duration-300 bg-black/30 z-[9998]`"
    ></div>
  </div>
</template>