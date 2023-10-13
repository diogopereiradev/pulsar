<script setup lang="ts">
import { usePreview } from '~/shared/states/previewState';

const preview = usePreview();

async function handlePageChange(pageId: number) {
  const page = preview.value.doc?.pages.find(page => page.id === pageId);
    
  if(page) {
    preview.value.currentSelectedPage = page;
  } else {
    console.error('Invalid page id!');
  }
}

onBeforeMount(() => {
  // Open navigation menu if the window width is upper than 1180px
  if(window.innerWidth >= 1180) {
    preview.value.navigationMenuIsOpen = true;
  }
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 1180) {
      preview.value.navigationMenuIsOpen = true;
    }
  });
});
</script>

<template>
  <div class="pulsar-doc-navigation-menu-container">
    <div 
      class="pulsar-doc-navigation-menu"
      :style="{
        opacity: preview.navigationMenuIsOpen? '1' : '0',
        pointerEvents: preview.navigationMenuIsOpen? 'auto' : 'none'
      }"
    >
      <!--Mobile close button-->
      <button @click="preview.navigationMenuIsOpen = false" class="pulsar-doc-navigation-menu-close-button">
        <font-awesome-icon icon="fa-solid fa-close" :style="{ color: preview.doc?.colors.text, fontSize: '20px' }"></font-awesome-icon>
      </button>
      <!--Map icon and title-->
      <div
        v-if="preview.doc?.navigationTitle"
        :style="{
          display: 'flex',
          gap: '15px'
        }"
      >
        <div class="pulsar-doc-navigation-menu-map-icon-container">
          <font-awesome-icon 
            icon="fa-solid fa-map" 
            :style="{ 
              color: preview.doc?.colors.primary,
              fontSize: '19px'
            }"
          />
        </div>
        <div :style="{
          display: 'flex',
          flexDirection: 'column'
        }">
          <p 
            :title="preview.doc?.navigationTitle" 
            class="pulsar-utils-truncate" 
            :style="{ 
              color: preview.doc?.colors.text + '99',
              maxWidth: '150px',
              fontSize: '17px'
            }"
          >
            {{ preview.doc?.navigationTitle }}
          </p>
          <p 
            :title="preview.doc?.navigationSubTitle"
            class="pulsar-utils-truncate" 
            :style="{ 
              color: preview.doc?.colors.text + '80',
              maxWidth: '150px',
              fontSize: '15px',
              marginTop: '-4px'
            }"
          >
            {{ preview.doc?.navigationSubTitle }}
          </p>
        </div>
      </div>
      <hr 
        v-if="preview.doc?.navigationTitle" 
        class="pulsar-navigation-menu-divider" 
      />
      <ul class="pulsar-doc-navigation-menu-category-list">
        <!--Categories-->
        <li v-for="category in preview.doc?.categories" :key="category.id">
          <h2 class="pulsar-doc-navigation-menu-category-item">{{ category.label }}</h2>
          <!--Pages-->
          <ul>
            <li 
              v-for="page in preview.doc?.pages.filter(p => p.categoryId === category.id)" 
              class="pulsar-doc-navigation-menu-category-page-item"
              :style="{
              }"
            >
            <button
                @click="handlePageChange(page.id)"
                :title="page.title"
                class="pulsar-utils-truncate" 
                :style="{ 
                  color: preview.currentSelectedPage?.id === page.id? preview.doc?.colors.primary : `${preview.doc?.colors.text}70`,
                  borderColor: preview.currentSelectedPage?.id === page.id? preview.doc?.colors.primary : preview.doc?.colors.divider + 'a9'
                }"
              >
                {{ page.title }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--Mobile navigation menu backdrop-->
    <div @click="preview.navigationMenuIsOpen = false" class="pulsar-navigation-menu-mobile-backdrop"></div>
  </div>
</template>

<style>
.pulsar-doc-navigation-menu-container {
  display: flex;
  justify-content: right;
  min-width: 250px;
}

.pulsar-doc-navigation-menu {
  display: flex;
  position: fixed;
  flex-direction: column;
  max-width: 240px;
  width: 100%;
  background-color: transparent;
  transition: .3s;
  z-index: 100;
}

.pulsar-navigation-menu-divider {
  width: 100%;
  height: 2px;
  border: none;
  background-color: v-bind('preview.doc?.colors.divider + "80"');
  margin-top: 20px;
  margin-bottom: 20px;
}

.pulsar-doc-navigation-menu-category-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  max-height: 79vh;
  padding-bottom: 30px;
  scrollbar-width: thin;
}

.pulsar-doc-navigation-menu-category-list::-webkit-scrollbar {
  width: 2px;
}

.pulsar-doc-navigation-menu-category-list::-webkit-scrollbar-thumb {
  background-color: v-bind('preview.doc?.colors.text + "50"');
}

.pulsar-navigation-menu-mobile-backdrop {
  opacity: v-bind('preview.navigationMenuIsOpen? "1" : "0"');
  pointer-events: v-bind('preview.navigationMenuIsOpen? "auto" : "none"');
  display: none;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #00000050;
  transition: .3s;
  z-index: 99;
} 

.pulsar-doc-navigation-menu-close-button {
  display: none;
  position: absolute;
  right: 30px;
  top: 30px;
} 

.pulsar-doc-navigation-menu-map-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 45px;
  height: 45px;
  background-color: v-bind('preview.doc?.colors.primary + "40"');
  border-radius: 10px;
} 

.pulsar-doc-navigation-menu-category-item {
  color: v-bind('preview.doc?.colors.text');
  font-weight: 500;
  font-size: 15px;
}

.pulsar-doc-navigation-menu-category-page-item:first-child {
  margin-top: 5px;
} 

.pulsar-doc-navigation-menu-category-page-item button {
  border-left: 2px solid v-bind('preview.doc?.colors.divider + "a9"');
  padding-left: 20px;
  margin-left: 1px;
  max-width: 160px;
  height: 36px;
  font-weight: 400;
  transition: .3s;
} 

.pulsar-doc-navigation-menu-category-page-item button:hover {
  color: v-bind('preview.doc?.colors.primary + "a9"') !important;
  border-left: 2px solid v-bind('preview.doc?.colors.primary + "a9"') !important;
}

/* 2xl */
@media only screen and (max-width: 1180px) {
  .pulsar-doc-navigation-menu-container {
    position: relative;
    min-width: 0px;
  }

  .pulsar-doc-navigation-menu {
    min-width: 220px;
    max-width: 320px;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: v-bind('preview.doc?.colors.secondary');
    padding: 50px 40px;
    overflow-y: scroll;
  }

  .pulsar-navigation-menu-mobile-backdrop {
    display: block;
  }

  .pulsar-doc-navigation-menu-close-button {
    display: block;
  }
}
</style>