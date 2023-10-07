<script setup lang="ts">
import { Documentation, IDocumentation, IDocumentationColorPalette } from '~/shared/storage/models/Documentation';
import Tailwind from "primevue/passthrough/tailwind";
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import ScrollPanel from 'primevue/scrollpanel';
import InputSwitch from 'primevue/inputswitch';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { useDocumentations } from '~/shared/states/documentationsState';
import { usePassThrough } from 'primevue/passthrough';
import { Status } from '~/@types/status';

const { docId, isOpen } = defineProps<{ docId: number, isOpen: boolean }>();
const emit = defineEmits(['close-modal']);
const docs = useDocumentations();
const docInfos = docs.value.data.find(doc => doc.id === docId);

const formData = ref<Pick<IDocumentation, 'title' | 'description' | 'features'>>({
  title: docInfos?.title || '',
  description: docInfos?.description || '',
  features: docInfos?.features || {
    indexesTable: true,
    autoSave: true
  }
});

const handleDocSave = async () => {
  const updatedPayload: Pick<IDocumentation, 'title' | 'description' | 'features'> = JSON.parse(JSON.stringify(formData.value));
  const result = await Documentation.edit(docId, {
    ...updatedPayload
  });

  if(result === Status.OK) {
    emit('close-modal');
    // Realtime update in docs list
    const updatedData = docs.value.data.map(doc => doc.id === docId? { ...doc, ...updatedPayload } : doc);
    docs.value.data = updatedData;
  } else {
    alert('Error on saving doc changes!');
  }
};

const handleCloseModal = () => {
  emit('close-modal');
  // Sets the default doc data, if user changed input areas but canceled the action
  const updatedDocInfos = docs.value.data.find(doc => doc.id === docId);
  formData.value = {
    title: updatedDocInfos?.title || '',
    description: updatedDocInfos?.description || '',
    features: updatedDocInfos?.features || {
      indexesTable: true,
      autoSave: true
    }
  };
}
</script>

<template>
  <div :class="`${isOpen? 'opacity-1' : 'opacity-0 pointer-events-none'} duration-300 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex max-xl:flex-col min-w-full xl:min-w-[400px] h-full xl:h-[450px] bg-secondary xl:rounded-[10px] max-xl:overflow-scroll z-[91]`">
    <!--Doc prototype-->
    <div class="flex justify-center items-center w-full xl:w-[400px] max-xl:py-[30px] bg-[#10111f] h-full rounded-l-[10px]">
      <DocPrototype
        :colors="(docInfos?.colors as IDocumentationColorPalette)"
        :features="formData.features"
      />
    </div>
    <!--Form-->
    <div class="w-full xl:w-[450px] p-[40px]">
      <h2 class="text-primary/80 text-[20px] font-[500]">{{ $t('documentations.edit-doc-modal-title') }}</h2>
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
        <form @submit.prevent="handleDocSave()" class="relative w-full h-full flex flex-col">
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
          <!--Cancel and submit buttons-->
          <div class="flex flex-wrap gap-[10px] mt-[50px] xl:pb-[40px] self-end">
            <Button @click="handleCloseModal" class="w-[140px] !h-[40px] !bg-secondary/10 contrast-200 hover:!bg-secondary/40">
              {{ $t('documentations.edit-doc-modal-cancel-button-message') }}
            </Button>
            <Button type="submit" class="w-[140px] !h-[40px] !bg-primary hover:!bg-primary/50">
              {{ $t('documentations.edit-doc-modal-save-button-message') }}
            </Button>
          </div>
        </form>
      </ScrollPanel>
    </div>
  </div>
  <!--Modal backdrop-->
  <div 
    @click="handleCloseModal"
    :class="`fixed left-0 top-0 w-screen h-screen bg-[#00000090] z-[90] duration-300 ${isOpen? 'opacity-1' : 'opacity-0 pointer-events-none'}`"
  ></div>
</template>