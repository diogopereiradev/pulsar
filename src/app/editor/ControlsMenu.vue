<script setup lang="ts">
import lodash from 'lodash';
import { Status } from '~/@types/status';
import Tailwind from "primevue/passthrough/tailwind";
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import ScrollPanel from 'primevue/scrollpanel';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import ColorPicker from 'primevue/colorpicker';
import InputSwitch from 'primevue/inputswitch';
import { usePassThrough } from 'primevue/passthrough';
import { Documentation, IDocumentation } from '~/shared/storage/models/Documentation';

const { params } = useRoute();
const router = useRouter();
const docId = Number(params.id) || 0;

type ControlsDataType = {
  data: IDocumentation,
  isPreviewMode: boolean,
  isSaved: boolean,
  isSaving: boolean
};

const controlsData = ref<ControlsDataType>({
  data: {
    id: 0,
    title: '',
    description: '',
    pages: [],
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
    },
    createdAt: 0
  },
  isPreviewMode: false,
  isSaved: true,
  isSaving: false
});

async function handleSave() {
  if(!controlsData.value.isSaved) {
    controlsData.value.isSaving = true;
    const result = await Documentation.edit(docId, {
      ...JSON.parse(JSON.stringify(controlsData.value.data))
    });

    if(result === Status.OK) {
      controlsData.value.isSaved = true;
    }
    controlsData.value.isSaving = false;
  }
}

const onColorChange = (type: keyof IDocumentation['colors'], val: string) => {
  controlsData.value.data.colors[type] = `#${val}`;
}

// Check if controlsData.value.data has been modified. If the data has been changed, the user can save the data
watch(() => controlsData.value.data, async (_, oldData) => {
  if(!oldData?.id) return;
  const docInfos = await Documentation.get(docId);

  if(lodash.isEqual(oldData, docInfos)) {
    controlsData.value.isSaved = true;
  } else {
    controlsData.value.isSaved = false;
  }
}, { deep: true });

// Set initial doc data in controlsData.value.data
onBeforeMount(async () => {
  const docInfos = await Documentation.get(docId);
  
  if(docInfos) {
    controlsData.value.data = docInfos;
  } else {
    router.push('/editor/0');
  }
});

// Array to dinamically generate "color pickers" of the menu
const colors = [
  generateColor('Background', 'background'),
  generateColor('Primary', 'primary'),
  generateColor('Secondary', 'secondary'),
  generateColor('Highlight', 'highlight'),
  generateColor('Text', 'text'),
  generateColor('Navbar Title', 'navbarTitle'),
  generateColor('Divider', 'divider')
];

type ColorName = 'primary' | 'secondary' | 'background' | 'highlight' | 'text' | 'navbarTitle' | 'divider'

function generateColor(title: string, colorName: ColorName) {
  return { title, colorName };
}
</script>

<template>
  <ScrollPanel 
    class="bg-secondary/40 max-w-[330px] h-screen"
    :pt="
      usePassThrough(Tailwind, { 
        scrollpanel: { 
          barY: 'max-xl:hidden !bg-secondary/30 contrast-200' 
        } 
      }, 
      { mergeProps: true, mergeSections: true }
    )"
  >
    <form @submit.prevent="handleSave" class="p-[30px]">
      <div class="pb-[30px]">
        <NuxtLinkLocale 
          to="/documentations" 
          class="flex items-center gap-[13px] w-[130px] min-h-[40px] bg-primary hover:bg-primary/80 active:bg-primary/60 duration-300 text-primary rounded-[5px] font-[500] pl-[20px]"
          aria-label=""
        >
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          {{ $t('editor.controls-menu-back-to-docs-button-message') }}
        </NuxtLinkLocale>
      </div>
      <hr class="w-full h-[2px] bg-divider/60 border-none mb-[30px]" />
      <div class="flex items-center justify-between">
        <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
        <div class="flex items-center gap-[10px]">
          <Button
            type="submit"
            class="w-[40px] min-h-[40px] bg-primary" 
            :title="$t('editor.controls-menu-save-button-aria-label')" 
            :aria-label="$t('editor.controls-menu-save-button-aria-label')"
            :disabled="controlsData.isSaved"
          >
            <font-awesome-icon v-if="!controlsData.isSaving" icon="fa-solid fa-floppy-disk" class="text-[17px]"/>
            <font-awesome-icon v-if="controlsData.isSaving" icon="fa-solid fa-circle-notch" class="text-[16px]" spin/>
          </Button>
        </div>
      </div>
      <hr class="w-full h-[2px] bg-divider/60 border-none my-[30px]" />
      <div class="flex flex-col pt-[5px] pb-[20px]">
        <h2 class="text-[18px] text-primary/80 font-[500]">{{ $t('editor.controls-menu-basic-infos-title') }}</h2>
        <!--Title input-->
        <div class="w-full flex flex-col gap-[8px] mt-[20px]">
          <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-title-input-label') }}</label>
          <InputText
            v-model="controlsData.data.title"
            class="rounded-[5px] contrast-200 !border-secondary/60"
            :placeholder="$t('editor.controls-menu-title-input-placeholder')"
            required
          />
        </div>
        <!--Description input-->
        <div class="w-full flex flex-col gap-[8px] mt-[20px]">
          <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-description-input-label') }}</label>
          <TextArea
            v-model="controlsData.data.description"
            class="!border-secondary/60 contrast-200 max-h-[150px]"
            :placeholder="$t('editor.controls-menu-description-input-placeholder')"
            required
          />
        </div>
        <!--Indexes table-->
        <div class="w-full flex justify-between gap-[8px] mt-[40px]">
          <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-indexestable-input-label') }}</label>
          <InputSwitch v-model="controlsData.data.features.indexesTable"/>
        </div>
        <!--Colors-->
        <div class="w-full flex flex-col gap-[8px] mt-[30px]">
          <label class="text-lg text-primary/70 font-[500]">{{ $t('editor.controls-menu-colors-area-title') }}</label>
          <div class="w-full flex flex-col flex-wrap gap-[25px] mt-[10px]">
            <div
              v-for="color of colors"
              :key="color.title"
              class="w-full flex justify-between gap-[8px]"
            >
              <label class="text-sm text-primary/40 font-[500]">{{ color.title }}</label>
              <ColorPicker 
                class="w-[80px]"
                :model-value="controlsData.data.colors[color.colorName]" 
                @update:model-value="(val: string) => onColorChange(color.colorName, val)" 
                format="hex" 
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </ScrollPanel>
</template>