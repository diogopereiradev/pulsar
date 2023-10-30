<template>
  <section class="w-full min-h-[430px] flex flex-col items-center gap-3 mt-28">
    <div class="absolute w-full max-w-[400px] h-[400px] bg-primary/10 blur-[80px] rounded-full z-[-1]"></div>
    <div class="gettingstarted-button-gradient flex items-center gap-3 max-w-[290px] min-h-[37px] max-lg:mb-2 border border-solid border-primary/70 rounded-[10px] px-4 duration-300">
      <p class="gettingstarted-text-gradient text-base text-primary/80">{{ $t('homepage.gettingstarted-feature-title') }}</p>
    </div>
    <h1 class="gettingstarted-title-gradient text-center text-[40px] lg:text-[50px] 2xl:text-[70px] leading-[50px] lg:leading-[75px] font-medium pb-3">{{ $t('homepage.gettingstarted-title') }}</h1>
    <h3 class="text-lg text-center text-primary/60">{{ $t('homepage.gettingstarted-description') }}</h3>
    <div class="flex items-center gap-2.5">
      <NuxtLinkLocale to="/documentations" class="px-5 py-3 rounded-[10px] border-none text-primary bg-primary/70 hover:bg-primary/90 mt-7 duration-300">
        {{ $t('homepage.gettingstarted-getting-started-button') }}
      </NuxtLinkLocale>
    </div>
  </section>
</template>

<style scoped>
  .gettingstarted-button-gradient {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191,0.2) 100%); 
  }
  
  .gettingstarted-text-gradient {
    background: linear-gradient(-90deg, rgba(234,205,240,1) 0%, rgba(158,146,232,1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .gettingstarted-title-gradient {
    background: -webkit-linear-gradient(#f0f0f0, #999999);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>