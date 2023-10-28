<script setup lang="ts">
import SparklingIcon from '~/shared/components/icons/SparklingIcon.vue';
</script>

<template>
  <header class="w-full min-h-[500px] flex flex-col items-center gap-3 pt-14">
    <div class="absolute w-full max-w-[400px] h-[400px] bg-primary/10 blur-[80px] rounded-full z-[-1]"></div>
    <a class="features-button-gradient flex items-center gap-3 max-w-[290px] min-h-[37px] max-lg:mb-2 border border-solid border-primary/70 rounded-[10px] px-4 duration-300 cursor-pointer">
      <SparklingIcon
        class="w-[21px] fill-white/70"
      />
      <p class="features-text-gradient text-base text-primary/80">{{ $t('homepage.header-feature-title') }}</p>
    </a>
    <h1 class="header-title-gradient text-center text-[40px] lg:text-[50px] 2xl:text-[70px] leading-[50px] lg:leading-[75px] font-medium pb-3">{{ $t('homepage.header-title') }}</h1>
    <h3 class="text-lg text-center text-primary/60">{{ $t('homepage.header-description') }}</h3>
    <div class="flex items-center gap-2.5">
      <NuxtLinkLocale to="/documentations" class="px-5 py-3 rounded-[10px] border-none text-primary bg-primary/70 hover:bg-primary/90 mt-7 duration-300">
        {{ $t('homepage.header-getting-started-button') }}
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/" class="px-5 py-3 rounded-[10px] text-primary bg-primary/20 hover:bg-primary/50 border border-solid border-primary/40 mt-7 duration-300">
        {{ $t('homepage.header-learn-about-button') }}
      </NuxtLinkLocale>
    </div>
    <div class="relative w-[85%] mt-32">
      <div class="w-full rounded-[10px] border-[10px] border-primary/20 shadow-[0px_0px_0px_1px_theme(colors.primary)99]">
        <picture class="w-full object-cover rounded-[10px]">
          <source media="(max-width: 468px)" srcset="/images/editor-mobile.webp" />
          <img src="/images/editor.webp" />
        </picture>
      </div>
      <div class="absolute -left-0.5 top-0 w-[calc(100%+4px)] h-[calc(100%+2px)] editor-image-gradient rounded-[10px]"></div>
    </div>
  </header>
</template>

<style scoped>
  .features-button-gradient {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191,0.2) 100%); 
  }

  .features-button-gradient:hover {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191, 0.3) 100%);
  }
  
  .features-text-gradient {
    background: linear-gradient(-90deg, rgba(234,205,240,1) 0%, rgba(158,146,232,1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .header-title-gradient {
    background: -webkit-linear-gradient(#f0f0f0, #999999);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .editor-image-gradient {
    background: rgb(15,17,27);
    background: linear-gradient(0deg, rgba(15,17,27,1) 15%, rgba(15,17,27,0.5004201509705445) 100%); 
  }
</style>