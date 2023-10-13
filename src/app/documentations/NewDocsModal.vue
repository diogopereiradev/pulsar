<script setup lang="ts">
import { Documentation, IDocumentation, IDocumentationColorPalette, documentationDataEmptyObj } from '~/shared/storage/models/Documentation';
import Tailwind from "primevue/passthrough/tailwind";
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import ScrollPanel from 'primevue/scrollpanel';
import InputSwitch from 'primevue/inputswitch';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { useDocumentations } from '~/shared/states/documentationsState';
import { usePassThrough } from 'primevue/passthrough';
import { Status } from '~/@types/status';
import HexColorPicker from '~/shared/components/HexColorPicker.vue';

const docs = useDocumentations();
const { id, createdAt, pages, ...formInitialData } = documentationDataEmptyObj;
const formData = ref<Omit<IDocumentation, 'id' | 'createdAt' | 'pages'>>(formInitialData);

const onColorChange = (type: keyof IDocumentationColorPalette, val: string) => {
  formData.value.colors[type] = `#${val}`;
}

const handleDocCreate = async () => {
  const payload = {
    id: Math.round(Math.random() * (1000 - 1) + 1),
    pages: [],
    createdAt: Date.now(),
    ...JSON.parse(JSON.stringify(formData.value))
  };
  const result = await Documentation.create(payload);

  if(result === Status.OK) {
    docs.value.newDocsModalIsOpen = !docs.value.newDocsModalIsOpen;
    docs.value.data = [
      ...docs.value.data,
      payload
    ];
    formData.value.title = '';
    formData.value.description = '';
  } else {
    alert('Error on creating a new documentation!');
  }
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
  <div :class="`${docs.newDocsModalIsOpen? 'opacity-1' : 'opacity-0 pointer-events-none'} duration-300 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex max-xl:flex-col min-w-full xl:min-w-[400px] h-full xl:h-[450px] bg-secondary xl:rounded-[10px] max-xl:overflow-scroll z-[91]`">
    <!--Doc prototype-->
    <div class="flex justify-center items-center w-full xl:w-[400px] max-xl:py-[30px] bg-[#10111f] h-full rounded-l-[10px]">
      <DocPrototype
        :colors="formData.colors"
        :features="formData.features"
      />
    </div>
    <!--Form-->
    <div class="w-full xl:w-[450px] p-[40px]">
      <h2 class="text-primary/80 text-[20px] font-[500]">{{ $t('documentations.new-doc-modal-title') }}</h2>
      <hr class="w-full h-[1px] bg-divider border-none mt-[20px]" />
      <ScrollPanel 
        class="relative w-full h-[calc(100%-10px)]"
        :pt="
          usePassThrough(Tailwind, { 
            scrollpanel: { 
              barY: 'max-xl:hidden ml-[40px] !bg-secondary/30 contrast-200' 
            } 
          }, 
          { mergeProps: true, mergeSections: true }
        )"
      >
        <form @submit.prevent="handleDocCreate()" class="relative w-full h-full flex flex-col">
          <!--Title input-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-md text-primary/70 font-[500]">{{ $t('documentations.new-doc-modal-title-input-label') }}</label>
            <InputText
              v-model="formData.title"
              class="rounded-[5px] contrast-200 !h-[45px] !border-secondary/60"
              :placeholder="$t('documentations.new-doc-modal-title-input-placeholder')"
              required
            />
          </div>
          <!--Description input-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-md text-primary/70 font-[500]">{{ $t('documentations.new-doc-modal-description-input-label') }}</label>
            <TextArea
              v-model="formData.description"
              class="!border-secondary/60 contrast-200 max-h-[74px]"
              :placeholder="$t('documentations.new-doc-modal-description-input-placeholder')"
              required
            />
          </div>
          <!--Indexes table-->
          <div class="w-full flex justify-between gap-[8px] mt-[40px]">
            <label class="text-md text-primary/70 font-[500]">{{ $t('documentations.new-doc-modal-indexestable-input-label') }}</label>
            <InputSwitch v-model="formData.features.indexesTable"/>
          </div>
          <!--Colors-->
          <div class="w-full flex flex-col gap-[8px] mt-[30px]">
            <label class="text-md text-primary/70 font-[500]">{{ $t('documentations.new-doc-modal-colors-area-title') }}</label>
            <div class="flex flex-wrap gap-[25px] mt-[10px]">
              <div
                v-for="color of colors"
                :key="color"
                class="w-full sm:max-w-[105px] flex flex-col gap-[8px]"
              >
                <label class="text-sm text-primary/40 font-[500]">{{ color }}</label>
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
          <div class="flex flex-wrap gap-[10px] mt-[50px] xl:pb-[40px] self-end">
            <Button @click="docs.newDocsModalIsOpen = !docs.newDocsModalIsOpen" class="w-[140px] !h-[45px] !bg-secondary/10 contrast-200 hover:!bg-secondary/40">
              {{ $t('documentations.new-doc-modal-cancel-button-message') }}
            </Button>
            <Button type="submit" class="w-[140px] !h-[45px] !bg-primary hover:!bg-primary/50">
              {{ $t('documentations.new-doc-modal-create-button-message') }}
            </Button>
          </div>
        </form>
      </ScrollPanel>
    </div>
  </div>
  <div 
    @click="docs.newDocsModalIsOpen = !docs.newDocsModalIsOpen"
    :class="`fixed left-0 top-0 w-screen h-screen bg-[#00000090] z-[90] duration-300 ${docs.newDocsModalIsOpen? 'opacity-1' : 'opacity-0 pointer-events-none'}`"
  ></div>
</template>