<template>
  <section class="flex flex-col items-center min-h-[400px] mt-32 mb-10 px-12">
    <div class="features-button-gradient flex items-center gap-3 h-[37px] max-lg:mb-2 border border-solid border-primary/70 rounded-[10px] px-4 duration-300">
      <p class="features-text-gradient text-base text-primary/80">{{ $t('homepage.editor-features-feature-title') }}</p>
    </div>
    <h3 class="title-gradient text-center text-[32px] md:text-[40px] font-medium pb-3 mt-5">{{ $t('homepage.editor-features-title') }}</h3>
    <p class="text-lg text-center text-primary/60">{{ $t('homepage.editor-features-description') }}</p>
    <div class="flex justify-center flex-wrap gap-5 mt-16">
      <!--Code blocks card-->
      <div class="w-full max-w-[400px] min-h-[350px] card-bg-gradient border border-primary/70 rounded-[10px] px-12 pb-5">
        <div class="w-full max-w-[300px] h-[130px] rounded-[10px] mx-auto mt-10 bg-secondary border border-primary/30 p-5 overflow-hidden">
          <div class="flex gap-1">
            <div class="w-[20px] h-[8px] bg-[#e66e6e] rounded-md"></div>
            <div class="animate-[functionName1_8s_infinite] w-[50px] h-[8px] bg-[#7cdd81] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
          </div>
          <div class="flex gap-1 mt-1.5 ml-2.5">
            <div class="animate-[functionName2_5s_infinite_1s] w-[40px] h-[8px] bg-[#a76dce] rounded-md"></div>
            <div class="w-[25px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="w-[30px] h-[8px] bg-[#7cdd81] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
          </div>
          <div class="flex gap-1 mt-1.5 ml-2.5">
            <div class="w-[30px] h-[8px] bg-[#a76dce] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="animate-[functionName3_3s_infinite_1.5s] w-[10px] h-[8px] bg-[#7cdd81] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
          </div>
          <div class="flex gap-1 mt-1.5">
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
          </div>
          <div class="flex gap-1 mt-3">
            <div class="w-[50px] h-[8px] bg-[#a76dce] rounded-md"></div>
            <div class="w-[25px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="w-[30px] h-[8px] bg-[#7cdd81] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
          </div>
          <div class="flex gap-1 mt-1.5">
            <div class="animate-[functionName4_3s_infinite_2s] w-[20px] h-[8px] bg-[#a76dce] rounded-md"></div>
            <div class="w-[25px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="w-[30px] h-[8px] bg-[#7cdd81] rounded-md"></div>
            <div class="w-[7px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
          </div>
        </div>
        <h3 class="features-text-gradient text-[22px] font-medium mt-8">{{ $t('homepage.editor-features-codeblocks-title') }}</h3>
        <h3 class="features-text-gradient text-base font-medium mt-2 opacity-[0.8]">{{ $t('homepage.editor-features-codeblocks-description') }}</h3>
      </div>
      <!--Tables card-->
      <div class="w-full max-w-[400px] min-h-[350px] card-bg-gradient border border-primary/70 rounded-[10px] px-12 pb-5">
        <div class="max-w-[300px] h-[130px] rounded-[10px] mx-auto mt-10 bg-secondary border border-primary/30">
          <div class="flex items-center px-5 w-full h-[30px] bg-secondary_darken rounded-t-[10px]">
            <div class="w-full max-w-[70px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
            <div class="w-full max-w-[1px] h-[10px] bg-primary/40 rounded-md ml-4"></div>
            <div class="w-full max-w-[50px] h-[8px] bg-[#f0ebeb] rounded-md ml-4"></div>
            <div class="w-full max-w-[1px] h-[10px] bg-primary/40 rounded-md ml-4"></div>
            <div class="w-full max-w-[90px] h-[8px] bg-[#f0ebeb] rounded-md ml-4"></div>
          </div>
          <div class="flex justify-between items-center px-5 w-full h-[30px]">
            <div class="w-full max-w-[50px] h-[8px] bg-[#f0ebeb]/40 rounded-md"></div>
            <div class="w-full max-w-[70px] h-[8px] bg-[#f0ebeb]/40 rounded-md ml-4"></div>
            <div class="w-full max-w-[50px] h-[8px] bg-[#f0ebeb]/40 rounded-md ml-4"></div>
          </div>
          <div class="flex justify-between items-center px-5 w-full h-[30px]">
            <div class="w-full max-w-[50px] h-[8px] bg-[#f0ebeb]/40 rounded-md"></div>
            <div class="w-full max-w-[70px] h-[8px] bg-[#f0ebeb]/40 rounded-md ml-4"></div>
            <div class="w-full max-w-[50px] h-[8px] bg-[#f0ebeb]/40 rounded-md ml-4"></div>
          </div>
          <div class="flex justify-between items-center px-5 w-full h-[30px]">
            <div class="w-full max-w-[50px] h-[8px] bg-[#f0ebeb]/40 rounded-md"></div>
            <div class="w-full max-w-[70px] h-[8px] bg-[#f0ebeb]/40 rounded-md ml-4"></div>
            <div class="w-full max-w-[50px] h-[8px] bg-[#f0ebeb]/40 rounded-md ml-4"></div>
          </div>
        </div>
        <h3 class="features-text-gradient text-[22px] font-medium mt-8">{{ $t('homepage.editor-features-tables-title') }}</h3>
        <h3 class="features-text-gradient text-base font-medium mt-2 opacity-[0.8]">{{ $t('homepage.editor-features-tables-description') }}</h3>
      </div>
      <!--Customizations card-->
      <div class="w-full max-w-[400px] min-h-[350px] card-bg-gradient border border-primary/70 rounded-[10px] px-12 pb-5">
        <div class="flex w-full max-w-[300px] h-[130px] rounded-[10px] mx-auto mt-10 bg-secondary border border-primary/30">
          <div class="min-w-[80px] h-full bg-secondary_darken rounded-l-[10px] p-3.5">
            <div>
              <div class="w-[40px] h-[8px] bg-[#f0ebeb] rounded-md"></div>
              <hr class="w-full max-w-full h-px bg-divider border-none mt-3" />
            </div>
            <div class="flex items-center justify-between mt-3">
              <div class="w-full max-w-[30px] h-[8px] bg-[#f0ebeb]/60 rounded-md"></div>
              <div class="w-full max-w-[10px] h-[8px] bg-primary rounded-md"></div>
            </div>
            <div class="flex justify-center items-center w-full h-[60px]">
              <div class="w-full max-w-[50px] h-[20px] bg-[#f0ebeb]/20 rounded-md"></div>
            </div>
          </div>
          <div class="flex justify-center items-center w-full h-full px-3">
            <div class="w-full max-w-[90px] h-[22px] bg-[#f0ebeb]/20 rounded-md"></div>
          </div>
        </div>
        <h3 class="features-text-gradient text-[22px] font-medium mt-8">{{ $t('homepage.editor-features-customizations-title') }}</h3>
        <h3 class="features-text-gradient text-base font-medium mt-2 opacity-[0.8]">{{ $t('homepage.editor-features-customizations-description') }}</h3>
      </div>
    </div>
  </section>
</template>

<style>
  .features-button-gradient {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191,0.2) 100%); 
  }

  .features-text-gradient {
    background: linear-gradient(-90deg, rgba(234,205,240,1) 0%, rgba(158,146,232,1) 80%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title-gradient {
    background: -webkit-linear-gradient(#f0f0f0, #999999);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-bg-gradient {
    background: linear-gradient(180deg, rgba(25,29,43,0) 20%, rgba(111,97,191,0.2) 100%); 
  }

  @keyframes functionName1 {
    0% { width: 50px; } 
    20% { width: 70px }
    40% { width: 40px; }
    60% { width: 60px; }
    80% { width: 30px; }
    100% { width: 50px; }
  }

  @keyframes functionName2 {
    0% { width: 40px; } 
    20% { width: 30px }
    40% { width: 20px; }
    60% { width: 10px; }
    80% { width: 30px; }
    100% { width: 40px; }
  }

  @keyframes functionName3 {
    0% { width: 10px; } 
    20% { width: 60px }
    40% { width: 20px; }
    60% { width: 10px; }
    80% { width: 40px; }
    100% { width: 10px; }
  }

  @keyframes functionName4 {
    0% { width: 20px; } 
    20% { width: 30px }
    40% { width: 40px; }
    60% { width: 20px; }
    80% { width: 15px; }
    100% { width: 20px; }
  }
</style>