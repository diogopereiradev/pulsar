<script setup lang="ts">
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import { useNavbar } from '~/shared/states/navbarState';
import ProjectPrincipiumLogo from '~/shared/components/icons/ProjectPrincipiumLogo.vue';

const navbar = useNavbar();
</script>

<template>
  <footer class="relative flex flex-col min-h-[300px] overflow-hidden">
    <hr class="footer-radial-separator h-px w-[95%] mx-auto" />
    <div class="absolute left-2/4 -top-48 -translate-x-2/4 w-full max-w-[400px] h-[400px] bg-primary/[0.06] blur-[120px] rounded-full"></div>
    <div class="flex-wrap flex w-full max-md:flex-col-reverse min-h-[300px] md:h-[320px] bg-secondary_darken 2xl:px-24">
      <!--Left content-->
      <div class="relative hidden lg:flex flex-col w-[18%] h-full p-14">
        <div class="flex items-center gap-3">
          <AppIcon class="min-w-[36px] max-w-[36px] fill-white/70"/>
          <h3 class="text-xl text-primary/80 font-medium">Pulsar</h3>
        </div>
        <div class="flex flex-col max-md:-mt-5 md:mt-8">
          <h3 class="text-[17px] text-primary/80 font-medium">{{ $t('others.sponsor-word') }}</h3>
          <a href="https://www.project-principium.dev/" target="_blank" rel="noreferrer">
            <ProjectPrincipiumLogo class="w-[190px] xl:w-[230px] mt-2 -ml-2" color="#808080"/>
          </a>
        </div>
        <div class="absolute bottom-10 flex items-center gap-3">
          <a 
            href="https://github.com/FhillSlinger/pulsar" 
            target="_blank" 
            rel="noreferrer" 
            class="flex justify-center items-center text-primary/80 max-md:hidden !gap-2.5 !min-w-[144px] !min-h-[48px] border border-primary/20 hover:bg-primary/70 duration-300 rounded-[10px]"
          >
            <font-awesome-icon icon="fa-solid fa-star" class="text-[#fadf68]"></font-awesome-icon>
            {{ $t('footer.star-the-project') }}
          </a>
        </div>
      </div>
      <!--Right content-->
      <div class="flex max-md:flex-wrap max-md:justify-center max-md:gap-10 max-md:pb-10 justify-between lg:justify-end w-[82%] max-lg:mx-auto h-full mt-16 z-[1]">
        <div class="flex flex-col h-full md:pl-1 md:pr-5 lg:px-10">
          <h3 class="text-base text-primary/90 font-medium">{{ $t('footer.product-section-title') }}</h3>
          <ul class="space-y-3 mt-4">
            <li>
              <a href="#featuressection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Markdown
              </a>
            </li>
            <li>
              <a href="#featuressection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                {{ $t('footer.product-colors-text') }}
              </a>
            </li>
            <li>
              <a href="#mainfeaturessection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                {{ $t('footer.product-code-blocks-text') }}
              </a>
            </li>
            <li>
              <a href="#customizationssection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                {{ $t('footer.product-customizations-text') }}
              </a>
            </li>
          </ul>
        </div>
        <div class="flex flex-col h-full md:pl-1 md:pr-5 lg:px-10">
          <h3 class="text-base text-primary/90 font-medium">{{ $t('footer.resources-section-title') }}</h3>
          <ul class="space-y-3 mt-4">
            <li>
              <NuxtLinkLocale to="/documentations" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                {{ $t('footer.resources-getting-started-text') }}
              </NuxtLinkLocale>
            </li>
            <li>
              <a 
                href="https://github.com/FhillSlinger/pulsar"
                target="_blank"
                rel="noreferrer"
                class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal"
              >
              {{ $t('footer.resources-documentations-text') }}
              </a>
            </li>
            <li>
              <button @click="() => { navbar.donateMenu.isOpen = true; navbar.mobileMenuIsOpen = true }" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                {{ $t('footer.resources-donate-text') }}
              </button>
            </li>
          </ul>
        </div>
        <div class="flex flex-col h-full md:pl-1 lg:px-10">
          <h3 class="text-base text-primary/90 font-medium">{{ $t('footer.developer-section-title') }}</h3>
          <ul class="space-y-3 mt-4">
            <li>
              <a
                href="https://github.com/FhillSlinger/pulsar/graphs/contributors"
                target="_blank"
                rel="noreferrer"
                class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal"
              >
                Contributors
              </a>
            </li>
            <li>
              <a
                href="https://diogopereira.tech"
                target="_blank"
                rel="noreferrer"
                class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://github.com/FhillSlinger"
                target="_blank"
                rel="noreferrer"
                class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="footer-radial-separator lg:hidden h-px w-[95%] mx-auto" />
    <!--Mobile bottom content-->
    <div class="flex justify-between items-center lg:hidden w-full min-h-[64px] px-12 py-7">
      <div class="flex flex-col">
        <h3 class="text-[17px] text-primary/80 font-medium">{{ $t('others.sponsor-word') }}</h3>
        <a href="https://www.project-principium.dev/" target="_blank" rel="noreferrer">
          <ProjectPrincipiumLogo class="w-[230px] mt-2 -ml-2" color="#808080"/>
        </a>
      </div>
      <a 
        href="https://github.com/FhillSlinger/pulsar" 
        target="_blank" 
        rel="noreferrer" 
        class="flex justify-center items-center text-primary/80 max-md:hidden !gap-2.5 !min-w-[144px] !min-h-[48px] border border-primary/20 hover:bg-primary/70 duration-300 rounded-[10px]"
      >
        <font-awesome-icon icon="fa-solid fa-star" class="text-[#fadf68]"></font-awesome-icon>
        {{ $t('footer.star-the-project') }}
      </a>
    </div>
  </footer>
</template>

<style scoped>
  .footer-radial-separator {
    border: none;
    background: rgb(25,29,43);
    background: radial-gradient(circle, rgb(35, 41, 61) 43%, rgba(15,17,27,1) 100%);
  }
</style>