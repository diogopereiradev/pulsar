<script setup lang="ts">
import { Documentation, IDocumentation } from '~/shared/storage/models/Documentation';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import ScrollPanel from 'primevue/scrollpanel';
import InputSwitch from 'primevue/inputswitch';
import ColorPicker from 'primevue/colorpicker';
import DocPrototype from './DocPrototype.vue';
import { useDocumentations } from '~/shared/states/documentationsState';

const docs = useDocumentations();
const formData = ref<Omit<IDocumentation, 'id' | 'createdAt' | 'pages'>>({
  title: '',
  description: '',
  colors: {
    background: '#151829',
    primary: '#7665d7',
    secondary: '#1a1d2e',
    highlight: '#7665d733',
    text: '#d3d3d3',
    navbarTitle: '#d3d3d3',
    divider: '#2b304a'
  },
  features: {
    indexesTable: true
  }
});

const onColorChange = (type: keyof IDocumentation['colors'], val: string) => {
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

  if(result === 1) {
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
</script>

<template>
  <div :class="`${docs.newDocsModalIsOpen? 'opacity-1' : 'opacity-0 pointer-events-none'} duration-300 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex max-lg:flex-col min-w-full lg:min-w-[400px] h-full lg:h-[400px] bg-secondary lg:rounded-[10px] max-lg:overflow-scroll z-[91]`">
    <!--Doc prototype-->
    <div class="flex justify-center items-center w-full lg:w-[350px] max-lg:py-[30px] bg-[#10111f] h-full rounded-l-[10px]">
      <DocPrototype
        :colors="formData.colors"
        :features="formData.features"
      />
    </div>
    <!--Form-->
    <div class="w-full lg:w-[400px] p-[40px]">
      <h2 class="text-primary/80 text-[20px] font-[500]">{{ $t('documentations.new-doc-modal-title') }}</h2>
      <hr class="w-full h-[1px] bg-divider border-none mt-[20px]" />
      <ScrollPanel class="relative h-[310px]">
        <form @submit.prevent="handleDocCreate()" class="relative w-full h-full flex flex-col pb-[710px]">
          <!--Title input-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-md text-primary/70 font-[500]">{{ $t('documentations.new-doc-modal-title-input-label') }}</label>
            <InputText
              v-model="formData.title"
              class="rounded-[5px] contrast-200 !border-secondary/60"
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
            <div class="flex flex-wrap gap-[25px] justify-between mt-[10px]">
              <div class="flex flex-col gap-[8px]">
                <label class="text-sm text-primary/40 font-[500]">Background</label>
                <ColorPicker 
                  :model-value="formData.colors.background" 
                  @update:model-value="(val: string) => onColorChange('background', val)" 
                  format="hex" 
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label class="text-sm text-primary/40 font-[500]">Primary</label>
                <ColorPicker
                  :model-value="formData.colors.primary" 
                  @update:model-value="(val: string) => onColorChange('primary', val)" 
                  format="hex" 
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label class="text-sm text-primary/40 font-[500]">Secondary</label>
                <ColorPicker
                  :model-value="formData.colors.secondary" 
                  @update:model-value="(val: string) => onColorChange('secondary', val)" 
                  format="hex" 
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label class="text-sm text-primary/40 font-[500]">Navbar Title</label>
                <ColorPicker
                  :model-value="formData.colors.navbarTitle" 
                  @update:model-value="(val: string) => onColorChange('navbarTitle', val)" 
                  format="hex" 
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label class="text-sm text-primary/40 font-[500]">Text</label>
                <ColorPicker
                  :model-value="formData.colors.text" 
                  @update:model-value="(val: string) => onColorChange('text', val)" 
                  format="hex" 
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label class="text-sm text-primary/40 font-[500]">Highlight</label>
                <ColorPicker
                  :model-value="formData.colors.highlight" 
                  @update:model-value="(val: string) => onColorChange('highlight', val)" 
                  format="hex" 
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label class="text-sm text-primary/40 font-[500]">Divider</label>
                <ColorPicker
                  :model-value="formData.colors.divider" 
                  @update:model-value="(val: string) => onColorChange('divider', val)" 
                  format="hex" 
                />
              </div>
            </div>
          </div>
          <!--Cancel and submit buttons-->
          <div class="flex gap-[10px] mt-[50px] self-end">
            <Button @click="docs.newDocsModalIsOpen = !docs.newDocsModalIsOpen" class="w-[140px] !h-[40px] !bg-secondary/10 contrast-200 hover:!bg-secondary/40">Cancelar</Button>
            <Button type="submit" class="w-[140px] !h-[40px] !bg-primary hover:!bg-primary/50">Criar</Button>
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