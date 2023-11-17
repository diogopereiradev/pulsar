<script setup lang="ts">
import { IDocumentation } from '~/@types/declarations/Documentation';
import { documentationDataEmptyObj } from '~/@types/utils/documentation';
import { IDocumentationColorPalette } from '~/@types/declarations/Documentation';
import { useToast } from 'primevue/usetoast';
import Tailwind from "primevue/passthrough/tailwind";
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import ScrollPanel from 'primevue/scrollpanel';
import InputSwitch from 'primevue/inputswitch';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { useDocumentations } from '~/shared/states/documentationsState';
import { usePassThrough } from 'primevue/passthrough';
import HexColorPicker from '~/shared/components/utils/HexColorPicker.vue';
import Loading from '~/shared/components/utils/Loading.vue';
import config from '~/server/config';

const docs = useDocumentations();
const toast = useToast();
const formData = ref<Omit<IDocumentation, "id" | "createdAt" | "authorIdentifier" | "updatedAt">>(documentationDataEmptyObj);

const showError = (message: string) => {
  toast.add({ 
    severity: 'error', 
    summary: 'Error', 
    detail: message,
    life: 6000
  });
};

const onColorChange = (type: keyof IDocumentationColorPalette, val: string) => {
  formData.value.colors[type] = `#${val}`;
}

const handleDocCreate = () => {
  if(docs.value.newDocsModal.isCreating) return;
  docs.value.newDocsModal.isCreating = true;
  setTimeout(async () => {
    try {
      const headers = useRequestHeaders(['cookie']) as HeadersInit;
      const result = await $fetch('/api/docs/createDoc', { 
        method: 'POST', 
        headers, 
        body: {
          documentation: JSON.parse(JSON.stringify(formData.value))
        }
      });
    
      if(result) {
        docs.value.data = [
          ...docs.value.data,
          result as IDocumentation
        ];
      } else {
        throw result;
      }
    } catch(err) {
      // @ts-expect-error
      showError(err.response.statusText);
    }
    docs.value.newDocsModal.isOpen = false;
    setTimeout(() => {
      docs.value.newDocsModal.isCreating = false;
    }, 300);
    formData.value.title = '';
    formData.value.description = '';
  }, 500);
};

// Array to dinamically generate "color pickers" of the modal
type ColorNames = keyof IDocumentationColorPalette;
const colors: ColorNames[] = [
  'background',
  'primary',
  'secondary',
  'text',
  'divider'
];
</script>

<template>
  <div :class="`${docs.newDocsModal.isOpen? 'opacity-1' : 'opacity-0 pointer-events-none'} fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex min-w-full xl:min-w-[400px] h-full xl:h-[450px] duration-300 bg-secondary xl:rounded-lg max-xl:overflow-scroll z-[91]`">
    <!--Form step-->
    <div v-if="!docs.newDocsModal.isCreating" class="flex max-xl:flex-col w-full">
      <!--Doc prototype-->
      <div class="flex justify-center items-center w-full xl:w-[400px] max-xl:py-8 bg-secondary_darken h-full rounded-l-[10px]">
        <DocPrototype
          :colors="formData.colors"
          :features="formData.features"
          navbar
        />
      </div>
      <!--Form-->
      <div class="w-full xl:w-[450px] p-10">
        <h2 class="text-primary/80 text-xl font-medium">{{ $t('documentations.new-doc-modal-title') }}</h2>
        <hr class="w-full h-px bg-divider border-none mt-5" />
        <ScrollPanel 
          class="relative w-full h-[calc(100%-10px)]"
          :pt="
            usePassThrough(Tailwind, { 
              scrollpanel: { 
                barY: 'max-xl:hidden ml-10 !bg-secondary/30 contrast-200' 
              } 
            }, 
            { mergeProps: true, mergeSections: true }
          )"
        >
          <form @submit.prevent="handleDocCreate()" class="relative w-full h-full flex flex-col">
            <!--Title input-->
            <div class="w-full flex flex-col gap-2 mt-5">
              <div class="flex items-center justify-between">
                <label class="text-md text-primary/70 font-medium">{{ $t('documentations.new-doc-modal-title-input-label') }}</label>
                <p :class="`text-[15px] ${formData.title.length >= config.DOC_TITLE_LIMIT? 'text-[#e46565]' : 'text-primary/70'}`">
                  {{ formData.title.length }}/{{ config.DOC_TITLE_LIMIT }}
                </p>
              </div>
              <InputText
                v-model="formData.title"
                class="rounded-md contrast-200 !h-11 !border-secondary/60"
                :placeholder="$t('documentations.new-doc-modal-title-input-placeholder')"
                :minlength="3"
                :maxlength="config.DOC_TITLE_LIMIT"
                required
              />
            </div>
            <!--Description input-->
            <div class="w-full flex flex-col gap-2 mt-5">
              <div class="flex items-center justify-between">
                <label class="text-md text-primary/70 font-medium">{{ $t('documentations.new-doc-modal-description-input-label') }}</label>
                <p :class="`text-[15px] ${formData.description.length >= config.DOC_DESCRIPTION_LIMIT? 'text-[#e46565]' : 'text-primary/70'}`">
                  {{ formData.description.length }}/{{ config.DOC_DESCRIPTION_LIMIT }}
                </p>
              </div>
              <TextArea
                v-model="formData.description"
                class="!border-secondary/60 contrast-200 max-h-[74px]"
                :placeholder="$t('documentations.new-doc-modal-description-input-placeholder')"
                :minlength="10"
                :maxlength="config.DOC_DESCRIPTION_LIMIT"
                required
              />
            </div>
            <!--Indexes table-->
            <div class="w-full flex justify-between gap-2 mt-10">
              <label class="text-md text-primary/70 font-medium">{{ $t('documentations.new-doc-modal-indexestable-input-label') }}</label>
              <InputSwitch v-model="formData.features.indexesTable"/>
            </div>
            <!--Colors-->
            <div class="w-full flex flex-col gap-2 mt-7">
              <label class="text-md text-primary/70 font-medium">{{ $t('documentations.new-doc-modal-colors-area-title') }}</label>
              <div class="flex flex-wrap gap-6 mt-2.5">
                <div
                  v-for="color of colors"
                  :key="color"
                  class="w-full sm:max-w-[105px] flex flex-col gap-2"
                >
                  <label class="text-sm text-primary/40 font-medium">{{ color }}</label>
                  <HexColorPicker
                    :toggler-button="{
                      width: '100%',
                      height: '38px'
                    }"
                    :model-value="formData.colors[color]"
                    @update:model-value="(val: string) => onColorChange(color, val)"
                  />
                </div>
              </div>
            </div>
            <!--Cancel and submit buttons-->
            <div class="flex flex-wrap gap-2.5 mt-12 xl:pb-10 self-end">
              <Button @click="docs.newDocsModal.isOpen = !docs.newDocsModal.isOpen" class="w-[140px] !h-11 !bg-secondary/10 contrast-200 hover:!bg-secondary/40">
                {{ $t('documentations.new-doc-modal-cancel-button-message') }}
              </Button>
              <Button type="submit" class="w-[140px] !h-11 !bg-primary hover:!bg-primary/50">
                {{ $t('documentations.new-doc-modal-create-button-message') }}
              </Button>
            </div>
          </form>
        </ScrollPanel>
      </div>
    </div>
    <!--Creating Step-->
    <div v-if="docs.newDocsModal.isCreating" class="flex flex-col relative w-full h-full">
      <!--Doc prototype-->
      <div class="flex justify-center items-center w-full max-xl:py-8 bg-secondary_darken h-[250px] rounded-t-[10px] overflow-hidden">
        <DocPrototype
          class="mt-60"
          :colors="formData.colors"
          :features="formData.features"
          navbar
        />
      </div>
      <Loading :custom-message="$t('documentations.new-doc-modal-creating-loading-message')" class="!h-[200px]"/>
    </div>
  </div>
  <div 
    @click="() => {
      if(docs.newDocsModal.isCreating) return;
      docs.newDocsModal.isOpen = !docs.newDocsModal.isOpen;
    }"
    :class="`fixed left-0 top-0 w-screen h-screen bg-[#00000090] z-[90] duration-300 ${docs.newDocsModal.isOpen? 'opacity-1' : 'opacity-0 pointer-events-none'}`"
  ></div>
</template>~/indexedDB/models/Documentation