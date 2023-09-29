<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { Status } from '~/@types/status';
import { useConfirm } from "primevue/useconfirm";
import { useEditor } from '~/shared/states/editorState';
import { Documentation, IDocumentationCategory } from '~/shared/storage/models/Documentation';
import InputableButton from './InputableButton.vue';

const { t } = useI18n();
const confirm = useConfirm();
const editor = useEditor();

const mobileNavigationIsOpen = ref(false);

async function handleNewCategory(value: string) {
  if(!value) return;

  const newCategory = {
    id: Math.round(Math.random() * (10000 - 1) + 1),
    label: value
  };
  const categoriesCopy = JSON.parse(JSON.stringify(editor.value.doc.categories));
  
  const result = await Documentation.edit(editor.value.doc.id, {
    categories: [...categoriesCopy, newCategory]
  });

  if(result === Status.OK) {
    setTimeout(() => editor.value.doc.categories = [...categoriesCopy, newCategory], 500);
  } else {
    console.error('An error occurred on creating a new category!');
  }
}

async function handleNewPage(value: string) {

}

function deleteConfirmDialog(categoryId: number) {
  confirm.require({
    header: t('editor.delete-category-dialog-title'),
    message: t('editor.delete-category-dialog-message'),
    acceptClass: 'min-w-[80px] min-h-[40px] !font-[400] !bg-[#c22d37] hover:!bg-[#992028] ml-[10px] border-0',
    rejectClass: '!w-[80px] min-h-[40px] !font-[400]',
    acceptLabel: t('editor.delete-category-dialog-confirm-button-message'),
    rejectLabel: t('editor.delete-category-dialog-cancel-button-message'),
    accept: async () => {
      const categoriesProxyClone = JSON.parse(JSON.stringify(editor.value.doc.categories));
      const categoriesUpdated = categoriesProxyClone.filter((category: IDocumentationCategory) => category.id != categoryId);
      const result = await Documentation.edit(editor.value.doc.id, {
        categories: categoriesUpdated
      });

      if(result === Status.OK) {
        editor.value.doc.categories = categoriesUpdated;
      } else {
        alert('An error occurred on trying to delete the category!');
      }
    }
  });
}

onBeforeMount(() => {
  mobileNavigationIsOpen.value = window.innerWidth >= 1180;
  window.addEventListener('resize', () => {
    mobileNavigationIsOpen.value = window.innerWidth >= 1180;
  });
});
</script>

<template>
  <div 
    class="w-full min-h-screen 2xl:max-h-screen px-[50px] py-[30px] 2xl:overflow-y-scroll"
    :style="{ backgroundColor: editor.doc.colors.background }"
  >
    <!--Doc navbar-->
    <nav class="flex items-center justify-between w-full pb-[25px]">
      <div class="flex items-center gap-[10px]">
        <p
          class="text-[25px] font-default font-[500]"
          :style="{ color: editor.doc.colors.navbarTitle }"
        >
          {{ editor.doc.title }}
        </p>
      </div>
      <div>
        <Button @click="mobileNavigationIsOpen = true" class="2xl:hidden border-none !bg-transparent hover:!bg-transparent !p-[6px]">
          <font-awesome-icon 
            icon="fa-solid fa-bars"
            class="text-[30px]"
          ></font-awesome-icon>
        </Button>
      </div>
    </nav>
    <hr class="w-full mx-auto h-[2px] border-none" :style="{ backgroundColor: editor.doc.colors.divider }" />
    <div class="flex pt-[40px] mt-[30px]">
      <!--Navigation Menu-->
      <div 
        :class="`
          mobile-navigationmenu-dinamic-bg
          ${!mobileNavigationIsOpen && 'opacity-0 pointer-events-none'}
          max-2xl:min-w-[220px]
          max-2xl:max-w-[320px]
          max-2xl:h-screen
          max-2xl:fixed 
          max-2xl:left-0 
          max-2xl:top-0
          max-2xl:px-[40px]
          max-2xl:py-[50px]
          max-2xl:overflow-y-scroll
          max-w-[220px] 
          w-full 
          flex 
          flex-col 
          gap-[20px]
          z-[11]
          duration-300
        `"
      >
        <!--Mobile close button-->
        <button @click="mobileNavigationIsOpen = false" class="absolute right-[30px] top-[30px]">
          <font-awesome-icon icon="fa-solid fa-close" class="text-[20px]" :style="{ color: editor.doc.colors.text }"></font-awesome-icon>
        </button>
        <!--Navigation menu title and icon-->
        <div v-if="editor.doc.navigationTitle" class="w-full flex items-center gap-[15px]">
          <div
            class="flex justify-center items-center w-[45px] h-[45px] rounded-[10px]"
            :style="{ backgroundColor: editor.doc.colors.primary + '40' }"
          >
            <font-awesome-icon 
              icon="fa-solid fa-map" 
              class="text-[19px]"
              :style="{ color: editor.doc.colors.primary }"
            />
          </div>
          <div class="flex flex-col">
            <p class="text-[17px]" :style="{ color: editor.doc.colors.text + '99' }">{{ editor.doc.navigationTitle }}</p>
            <p class="text-[15px] mt-[-4px]" :style="{ color: editor.doc.colors.text + '80' }">{{ editor.doc.navigationSubTitle }}</p>
          </div>
        </div>
        <hr v-if="editor.doc.navigationTitle" class="w-full mx-auto h-[2px] border-none" :style="{ backgroundColor: editor.doc.colors.divider + '40' }" />
        <!--Navigation categories-->
        <ul class="flex flex-col gap-[10px]">
          <li v-for="category in editor.doc.categories" :key="category.id" class="group">
            <div class="flex items-center justify-between">
              <h2 class="text-[15px] font-[500]" :style="{ color: editor.doc.colors.text }">{{ category.label }}</h2>
              <Button
                @click="deleteConfirmDialog(category.id)"
                class="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:!bg-[#f99999]/20 !w-[30px] !h-[30px] border-none"
              >
                <font-awesome-icon icon="fa-solid fa-trash" class="text-[17px] text-[#e07575]"></font-awesome-icon>
              </Button>
            </div>
            <ul class="ml-[10px] mt-[5px]">
              <li>
                <InputableButton
                  :color="editor.doc.colors.text"
                  @update:submit="handleNewPage"
                >
                  <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
                  {{ $t('editor.doc-editor-new-page-button-message') }}
                </InputableButton>
              </li>
            </ul>
          </li>
          <li class="mt-[10px]">
            <InputableButton
              :color="editor.doc.colors.text"
              @update:submit="handleNewCategory"
            >
              <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
              {{ $t('editor.doc-editor-new-category-button-message') }}
            </InputableButton>
          </li>
        </ul>
      </div>
      <!--Mobile Navigation menu backdrop-->
      <div 
        @click="mobileNavigationIsOpen = false" 
        :class="`2xl:hidden ${!mobileNavigationIsOpen && 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen bg-[#00000060] duration-300 z-[10]`"
      ></div>
    </div>
  </div>
</template>

<style scoped>
  .mobile-navigationmenu-dinamic-bg {
    background-color: v-bind('editor.doc.colors.secondary');
  }

  @media only screen and (min-width: 1180px) {
    .mobile-navigationmenu-dinamic-bg {
      background-color: transparent;
    }
  }
</style>