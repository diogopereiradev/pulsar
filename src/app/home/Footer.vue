<script setup lang="ts">
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import { useNavbar } from '~/shared/states/navbarState';

const navbar = useNavbar();
</script>

<template>
  <footer class="relative flex flex-col min-h-[300px] overflow-hidden">
    <hr class="footer-radial-separator h-px w-[95%] mx-auto" />
    <div class="absolute left-2/4 -top-48 -translate-x-2/4 w-full max-w-[400px] h-[400px] bg-primary/[0.06] blur-[120px] rounded-full"></div>
    <div class="flex w-full min-h-[300px] md:h-[300px] bg-secondary_darken 2xl:px-24">
      <!--Left content-->
      <div class="relative hidden lg:flex flex-col w-[18%] h-full p-14">
        <div class="flex items-center gap-3">
          <AppIcon class="min-w-[36px] max-w-[36px] fill-white/70"/>
          <h3 class="text-xl text-primary/80 font-medium">Pulsar</h3>
        </div>
        <div class="absolute bottom-14 flex flex-col">
          <a
            href="https://github.com/FhillSlinger/pulsar"
            target="_blank"
            rel="noreferrer"
            class="p-1"
          >
            <font-awesome-icon icon="fa-brands fa-github" class="text-2xl text-primary/30"></font-awesome-icon>
          </a>
        </div>
      </div>
      <!--Right content-->
      <div class="flex max-md:flex-wrap max-md:justify-center max-md:gap-10 max-md:pb-10 justify-between lg:justify-end w-[82%] max-lg:mx-auto h-full mt-16 z-[1]">
        <div class="flex flex-col h-full md:pl-1 md:pr-5 lg:px-10">
          <h3 class="text-base text-primary/90 font-medium">Product</h3>
          <ul class="space-y-3 mt-4">
            <li>
              <a href="#featuressection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Markdown
              </a>
            </li>
            <li>
              <a href="#featuressection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Colors
              </a>
            </li>
            <li>
              <a href="#mainfeaturessection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Code Blocks
              </a>
            </li>
            <li>
              <a href="#customizationssection" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Customizations
              </a>
            </li>
          </ul>
        </div>
        <div class="flex flex-col h-full md:pl-1 md:pr-5 lg:px-10">
          <h3 class="text-base text-primary/90 font-medium">Resources</h3>
          <ul class="space-y-3 mt-4">
            <li>
              <NuxtLinkLocale to="/documentations" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Getting Started
              </NuxtLinkLocale>
            </li>
            <li>
              <a href="#" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Documentations
              </a>
            </li>
            <li>
              <button @click="() => { navbar.donateMenu.isOpen = true; navbar.mobileMenuIsOpen = true }" class="text-base text-primary/50 hover:text-secondary/80 duration-300 font-normal">
                Donate
              </button>
            </li>
          </ul>
        </div>
        <div class="flex flex-col h-full md:pl-1 lg:px-10">
          <h3 class="text-base text-primary/90 font-medium">Developer Links</h3>
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
  </footer>
</template>

<style scoped>
  .footer-radial-separator {
    border: none;
    background: rgb(25,29,43);
    background: radial-gradient(circle, rgb(35, 41, 61) 43%, rgba(15,17,27,1) 100%);
  }
</style>