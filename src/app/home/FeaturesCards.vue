<script setup lang="ts">
const isMobile = ref(false);

type Item = {
  icon: string,
  title: string,
  description: string,
  new?: boolean
};

const { t } = useI18n();

const topItems = ref<Item[]>([
  {
    icon: 'fa-solid fa-download',
    title: t('homepage.features-export-title'),
    description: t('homepage.features-export-description')
  },
  {
    icon: 'fa-solid fa-upload',
    title: t('homepage.features-import-title'),
    description: t('homepage.features-import-description')
  },
  {
    icon: 'fa-solid fa-microchip',
    title: t('homepage.features-customizations-title'),
    description: t('homepage.features-customizations-description'),
    new: true
  },
  {
    icon: 'fa-solid fa-palette',
    title: t('homepage.features-colors-title'),
    description: t('homepage.features-colors-description')
  }
]);

const bottomItems = ref<Item[]>([
  {
    icon: 'fa-solid fa-eye',
    title: t('homepage.features-preview-title'),
    description: t('homepage.features-preview-description')
  },
  {
    icon: 'fa-brands fa-markdown',
    title: t('homepage.features-markdown-title'),
    description: t('homepage.features-markdown-description')
  },
  {
    icon: 'fa-solid fa-code',
    title: t('homepage.features-codeblocks-title'),
    description: t('homepage.features-cobeblocks-description')
  },
  {
    icon: 'fa-solid fa-table',
    title: t('homepage.features-tables-title'),
    description: t('homepage.features-tables-description')
  }
]);

onMounted(() => {
  if(window.innerWidth <= 1344) {
    isMobile.value = false;
  }

  window.addEventListener('resize', () => {
    if(window.innerWidth <= 1344) {
      isMobile.value = false;
    } else {
      isMobile.value = true;
    }
  });
});
</script>

<template>
  <section id="featuressection" class="w-full flex max-w-[1600px] mx-auto min-h-[300px] px-20 mt-2">
    <hr class="max-[1344px]:hidden side-separator w-0.5 h-[300px] border-none" />
    <div class="w-full flex flex-col">
      <!--Top cards container-->
      <div class="w-full flex justify-center flex-wrap">
        <!--Top cards-->
        <div class="flex grow min-w-[250px] w-[295px]" v-for="(item, i) in topItems">
          <hr class="min-[1344px]:hidden side-separator min-w-[2px] h-full border-none" v-if="i === 0" />
          <div 
            :title="item.description"
            class="relative flex flex-col items-start w-full h-[196px] cursor-pointer px-[45px] py-8 card-hover-gradient duration-300"
          >
            <div v-if="item.new" class="absolute right-7 top-7 flex items-center justify-center min-w-[70px] min-h-[36px] new-button-gradient border border-solid border-primary/70 rounded-[10px]">
              <p class="new-button-text-gradient">{{ $t('homepage.features-new-text') }}</p>
            </div>
            <font-awesome-icon :icon="item.icon" class="text-[28px] text-primary/90"></font-awesome-icon>
            <h3 class="text-primary text-[18px] mt-5">{{ item.title }}</h3>
            <p class="text-primary/50 text-base mt-2">{{ item.description }}</p>
          </div>
          <hr class="side-separator w-0.5 h-full border-none" v-if="i < topItems.length - 1" />
        </div>
      </div>
      <hr class="max-[1344px]:hidden middle-separator" />
      <!--Bottom cards container-->
      <div class="w-full flex justify-center flex-wrap">
        <!--Bottom cards-->
        <div class="flex grow min-w-[250px] w-[295px]" v-for="(item, i) in bottomItems">
          <hr class="min-[1344px]:hidden side-separator min-w-[2px] h-full border-none rotate-180" v-if="i === 0" />
          <div
            :title="item.description"
            class="relative flex flex-col items-start w-full h-[196px] cursor-pointer px-[45px] py-8 bottom-card-hover-gradient duration-300"
          >
            <div v-if="item.new" class="absolute right-7 top-7 flex items-center justify-center min-w-[70px] min-h-[36px] new-button-gradient border border-solid border-primary/70 rounded-[10px]">
              <p class="new-button-text-gradient">{{ $t('homepage.features-new-text') }}</p>
            </div>
            <font-awesome-icon :icon="item.icon" class="text-[28px] text-primary/90"></font-awesome-icon>
            <h3 class="text-primary text-[18px] mt-5">{{ item.title }}</h3>
            <p class="text-primary/50 text-base mt-2">{{ item.description }}</p>
          </div>
          <hr class="side-separator w-0.5 h-full border-none rotate-180" v-if="i < bottomItems.length - 1" />
        </div>
      </div>
    </div>
    <hr class="max-[1344px]:hidden side-separator w-0.5 h-[300px] border-none" />
  </section>
</template>

<style scoped>
.side-separator {
  background: rgb(34,38,56);
  background: linear-gradient(180deg, rgba(34,38,56,1) 15%, rgba(15,17,27,0.5200279941077994) 100%);
}

.middle-separator {
  width: 100%;
  height: 2px;
  border: none;
  background: rgb(25,29,43);
  background: radial-gradient(circle, rgba(25,29,43,1) 43%, rgba(15,17,27,1) 100%);
}

.card-hover-gradient:hover {
  background: rgb(34,38,56);
  background: linear-gradient(180deg, rgba(34,38,56,0) 0%, rgba(118,100,223,0.1) 100%); 
}

.bottom-card-hover-gradient:hover {
  background: rgb(34,38,56);
  background: linear-gradient(0deg, rgba(34,38,56,0) 0%, rgba(118,100,223,0.1) 100%); 
}

.new-button-gradient {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191,0.2) 100%); 
  }

.new-button-gradient:hover {
  background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191, 0.3) 100%);
}

.new-button-text-gradient {
    background: linear-gradient(-90deg, rgba(234,205,240,1) 0%, rgba(158,146,232,1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>