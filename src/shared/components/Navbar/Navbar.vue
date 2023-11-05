<script setup lang="ts">
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import Dropdown from 'primevue/dropdown';
import MobileMenu from './MobileMenu.vue';
import DonateMenu from './DonateMenu.vue';
import { useNavbar } from '~/shared/states/navbarState';

const { localeProperties, setLocale, locale } = useI18n();
const navbar = useNavbar();
const auth = useAuth();

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
  <nav class="relative w-full flex-col px-7 3xl:px-32 xl:px-14 md:px-12 py-10 z-[80]">
    <div class="w-full flex items-center justify-between">
      <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
      <div class="hidden xl:flex items-center px-7 h-11 bg-secondary/10 rounded-[10px] border border-solid border-primary/20">
        <ul class="flex items-center gap-7">
          <li>
            <NuxtLinkLocale to="/" class="text-primary/80 hover:text-secondary/90 duration-300 font-normal">
              {{ $t('navbar.links-home') }}
            </NuxtLinkLocale>
          </li>
          <li>
            <a 
              href="https://github.com/FhillSlinger/pulsar"
              target="_blank"
              rel="noreferrer"
              class="text-primary/80 hover:text-secondary/90 duration-300 font-normal"
            >
              {{ $t('navbar.links-documentations') }}
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/FhillSlinger/pulsar" 
              target="_blank" 
              rel="noreferrer" 
              class="text-primary/80 hover:text-secondary/90 duration-300 font-normal"
            >
              Github
            </a>
          </li>
          <li>
            <div class="flex flex-col">
              <button @click="navbar.donateMenu.isOpen = true" class="text-primary/80 hover:text-secondary/90 duration-300">
                {{ $t('navbar.links-donate') }}
              </button>
              <DonateMenu/>
            </div>
          </li>
        </ul>
      </div>
      <div class="hidden xl:flex items-center gap-2.5">
        <Dropdown 
          class="max-w-[170px] 2xl:max-w-[180px] !h-11 !rounded-[10px] !px-2"
          v-model="navbar.selectedLocale"
          :options="$i18n.locales" 
          optionLabel="name"
          :placeholder="$i18n.localeProperties.name"
        />
        <NuxtLinkLocale 
          to="/documentations"
          :class="`
            ${$route.path.match('/documentations') || $route.path.match('/auth') || auth.status.value === 'authenticated'? 'hidden' : 'flex'} 
            items-center 
            justify-center 
            w-[150px] 
            2xl:w-[160px] 
            h-11 
            text-primary 
            font-normal 
            bg-primary/80 
            hover:bg-primary/60 
            hover:text-primary/90 
            duration-300 
            border-none 
            rounded-[10px]
          `"
        >
          {{ $t('navbar.getting-started-button') }}
        </NuxtLinkLocale>
        <!--Logged profile-->
        <div v-if="auth.status.value === 'authenticated'" class="relative">
          <button
            @click="navbar.profileMenuIsOpen = !navbar.profileMenuIsOpen"
            class="relative flex items-center gap-2.5 ml-1 mr-2 z-[9999]"
          >
            <NuxtImg
              class="w-[42px] rounded-[10px]"
              v-if="auth.data.value?.user?.image"
              :src="auth.data.value.user.image" 
              :alt="`${auth.data.value?.user?.name?.toLowerCase().replaceAll(' ', '').trim()}-avatar`"
            />
            <div class="flex items-center gap-2.5">
              <p class="text-primary">{{ auth.data.value?.user?.name }}</p>
              <font-awesome-icon icon="fa-solid fa-chevron-down" class="text-[12px] text-primary"></font-awesome-icon>
            </div>
          </button>
          <div 
            :class="`
              ${navbar.profileMenuIsOpen? 'flex' : 'opacity-0 scale-[0.7] pointer-events-none'}
              absolute 
              left-0 
              top-[55px] 
              w-[200px] 
              min-h-[140px] 
              bg-secondary/60 
              backdrop-blur-lg 
              rounded-[10px] 
              shadow
              duration-300
              z-[9999]
            `"
          >
            <ul class="flex flex-col gap-3 w-full py-5">
              <li class="w-full px-6">
                <NuxtLinkLocale 
                  @click="navbar.profileMenuIsOpen = false" 
                  to="/documentations" 
                  class="flex items-center gap-3 w-full h-[45px] rounded-[10px] hover:!bg-primary/90 duration-300 px-4 cursor-pointer"
                >
                  <font-awesome-icon icon="fa-solid fa-table-columns" class="text-xl text-primary"></font-awesome-icon>
                  <p class="text-primary">Dashboard</p>
                </NuxtLinkLocale>
              </li>
              <li class="w-full px-6">
                <button
                  @click="() => {
                    navbar.profileMenuIsOpen = false;
                    auth.signOut({ callbackUrl: `${locale === 'en'? '' : `/${locale}`}` });
                  }" 
                  class="flex items-center gap-3 w-full h-[45px] rounded-[10px] hover:!bg-[#b35555]/30 duration-300 px-4 text-[#c56060]"
                >
                  <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="text-xl"></font-awesome-icon>
                  <p class="text-md">Logout</p>
                </button>
              </li>
            </ul>
          </div>
          <div 
            @click="navbar.profileMenuIsOpen = false"
            :class="`${navbar.profileMenuIsOpen? '' : 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen duration-300 z-[9998]`"
          ></div>
        </div>
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