<script setup lang="ts">
import StarsRain from '~/shared/components/utils/StarsRain.vue';

type Item = {
  icon: string,
  title: string,
  description: string
};

const { t } = useI18n();

const topItems = ref<Item[]>([
  {
    icon: 'fa-solid fa-code',
    title: 'HTML',
    description: t('homepage.customizations-features-html-description')
  },
  {
    icon: 'fa-brands fa-css3',
    title: 'CSS',
    description: t('homepage.customizations-features-css-description')
  },
  {
    icon: 'fa-brands fa-square-js',
    title: 'Javascript',
    description: t('homepage.customizations-features-javascript-description')
  }
]);
</script>

<template>
  <section class="flex flex-col items-center min-h-[400px] mt-24 mb-10">
    <div class="flex flex-col items-center w-full px-12">
      <div class="customizations-button-gradient flex items-center gap-3 h-[37px] max-lg:mb-2 border border-solid border-primary/70 rounded-[10px] px-4 duration-300">
        <p class="customizations-text-gradient text-base text-primary/80">{{ $t('homepage.customizations-feature-button') }}</p>
      </div>
      <h3 class="customizations-title-gradient text-center text-[32px] md:text-[40px] font-medium pb-3 mt-5">{{ $t('homepage.customizations-title') }}</h3>
      <p class="text-lg text-center text-primary/60">{{ $t('homepage.customizations-description') }}</p>
    </div>
    <StarsRain
      :amount="40"
      :max-speed="8"
      :min-speed="2"
      :max-size="3"
      class="w-[85%] max-w-[1400px] -mt-20"
    />
    <div class="relative w-[85%] max-w-[1400px]">
      <div class="w-full rounded-[10px] border-[10px] border-primary/20 shadow-[0px_0px_0px_1px_theme(colors.primary)99]">
        <picture class="w-full object-cover rounded-[10px]">
          <source media="(max-width: 568px)" srcset="/images/customizations-mobile.webp" />
          <img class="w-full object-cover" src="/images/customizations.webp" />
        </picture>
      </div>
      <div class="absolute -left-0.5 top-0 w-[calc(100%+4px)] h-[calc(100%+2px)] customizations-image-gradient rounded-[10px]"></div>
    </div>
    <!--Cards container-->
    <div class="w-full max-w-[1600px] flex justify-center flex-wrap px-20">
      <hr class="max-[1344px]:hidden customizations-separator w-0.5 h-[230px] border-none" />
      <!--Cards-->
      <div class="flex grow min-w-[250px] w-[295px]" v-for="(item, i) in topItems">
        <hr class="min-[1344px]:hidden customizations-separator min-w-[2px] h-full border-none" v-if="i === 0" />
        <div 
          :title="item.description"
          class="relative flex flex-col items-start w-full min-h-[230px] cursor-pointer px-[45px] py-8 customizations-cards-hover-gradient duration-300"
        >
          <font-awesome-icon :icon="item.icon" class="text-[28px] text-primary/90"></font-awesome-icon>
          <h3 class="text-primary text-[18px] mt-5">{{ item.title }}</h3>
          <p class="text-primary/50 text-base mt-2">{{ item.description }}</p>
        </div>
        <hr class="customizations-separator w-0.5 h-full border-none" v-if="i < topItems.length - 1" />
      </div>
      <hr class="max-[1344px]:hidden customizations-separator w-0.5 h-[230px] border-none" />
    </div>
  </section>
</template>

<style>
  .customizations-button-gradient {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191,0.2) 100%); 
  }

  .customizations-text-gradient {
    background: linear-gradient(-90deg, rgba(234,205,240,1) 0%, rgba(158,146,232,1) 80%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .customizations-title-gradient {
    background: -webkit-linear-gradient(#f0f0f0, #999999);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .customizations-image-gradient {
    background: rgb(15,17,27);
    background: linear-gradient(0deg, rgba(15,17,27,1) 0%, rgba(15,17,27,0.5004201509705445) 100%); 
  }

  .customizations-separator {
    background: rgb(34,38,56);
    background: linear-gradient(180deg, rgba(34,38,56,1) 15%, rgba(15,17,27,0.5200279941077994) 100%);
  }

  .customizations-cards-hover-gradient:hover {
    background: rgb(34,38,56);
    background: linear-gradient(180deg, rgba(34,38,56,0) 0%, rgba(118,100,223,0.1) 100%); 
  }
</style>