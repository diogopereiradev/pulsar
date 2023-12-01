<script setup lang="ts">
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import StarsRain from '~/shared/components/utils/StarsRain.vue';

definePageMeta({
  middleware: 'authentication'
});

const { locale } = useI18n();
const auth = useAuth();
</script>

<template>
  <Head>
    <Title>{{ $t('auth.title') }}</Title>
  </Head>
  <div class="relative flex flex-col h-screen overflow-hidden">
    <div class="flex justify-center items-center w-full h-full">
      <div class="flex flex-col gap-2.5 -mt-4 md:-mt-12 px-3">
        <div class="flex flex-col items-center gap-2.5">
          <NuxtLinkLocale to="/">
            <AppIcon class="w-[80px]" color="#f0f0f0"/>
          </NuxtLinkLocale>
          <h2 class="text-[30px] text-primary font-medium">{{ $t('auth.form-title') }}</h2>
        </div>
        <div class="flex flex-col gap-3.5 mt-5">
          <Button 
            @click="auth.signIn('google', { callbackUrl: `${locale === 'en'? '' : `/${locale}`}/documentations` })" 
            class="flex justify-between !w-[300px] !h-[52px] !bg-[#b14b4b] hover:!bg-[#964242] !border-none !px-6"
          >
            <font-awesome-icon icon="fa-brands fa-google" class="text-2xl"></font-awesome-icon>
            <p class="text-lg font-medium mr-6">Google</p>
            <p></p>
          </Button>
          <Button 
            @click="auth.signIn('github', { callbackUrl: `${locale === 'en'? '' : `/${locale}`}/documentations` })" 
            class="flex justify-between !w-[300px] !bg-[#1a1d31] hover:!bg-[#1d2036] !border-none !h-[52px] !px-6"
          >
            <font-awesome-icon icon="fa-brands fa-github" class="text-3xl"></font-awesome-icon>
            <p class="text-lg font-medium mr-8">Github</p>
            <p></p>
          </Button>
          <Button 
            @click="auth.signIn('discord', { callbackUrl: `${locale === 'en'? '' : `/${locale}`}/documentations` })" 
            class="flex justify-between !w-[300px] !h-[52px] !bg-[#262b44] hover:!bg-[#2d3250] !border-none !px-6"
          >
            <font-awesome-icon icon="fa-brands fa-discord" class="text-2xl"></font-awesome-icon>
            <p class="text-lg font-medium mr-6">Discord</p>
            <p></p>
          </Button>
        </div>
      </div>
    </div>
    <div class="absolute left-2/4 -translate-x-2/4 -bottom-48 w-full h-[200px] bg-primary/10 blur-[80px] rounded-full z-[-1]"></div>
    <StarsRain
      :amount="40"
      :max-speed="8"
      :min-speed="2"
      :max-size="3"
      class="!absolute bottom-0 w-full pointer-events-none"
    />
  </div>
</template>

<style scoped>
  .editor-image-gradient {
    background: rgb(15,17,27);
    background: linear-gradient(-90deg, rgba(15,17,27,1) 15%, rgba(15,17,27,0.5004201509705445) 100%); 
  }
</style>