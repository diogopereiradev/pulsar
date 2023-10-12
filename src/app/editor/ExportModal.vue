<script setup lang="ts">
import fileSaver from 'file-saver';
import { DocumentationFileBuilder } from '~/shared/dfb/DocumentationFileBuilder';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useEditor } from '~/shared/states/editorState';

const { t } = useI18n();
const confirm = useConfirm();
const editor = useEditor();

function startDocumentationExport() {
  editor.value.exportDocModal.isDownloading = true;
  editor.value.exportDocModal.isLoading = true;

  setTimeout(async () => {
    const dfb = new DocumentationFileBuilder(editor.value.doc);
    const compressedBlob = await dfb.generate('vite');
  
    if(compressedBlob) {
      editor.value.exportDocModal.data = compressedBlob;
      editor.value.exportDocModal.isLoading = false;
    } else {
      editor.value.exportDocModal.isLoading = false;
      editor.value.exportDocModal.isError = true;
    }
  }, 500);
}

function downloadDocumentationFiles() {
  const fileName = `${editor.value.doc.title.toLocaleLowerCase().replaceAll(' ', '').trim()}.zip`;
  const fileData = editor.value.exportDocModal.data;
  
  if(fileData) {
    fileSaver.saveAs(fileData, fileName);
    editor.value.exportDocModal.isDownloading = false;
    editor.value.exportDocModal.isOpen = false;
  } else {
    editor.value.exportDocModal.isDownloading = false;
    editor.value.exportDocModal.isLoading = false;
    editor.value.exportDocModal.isError = true;
  }
}

watch(() => editor.value.exportDocModal.isOpen, (val) => {
  if(val) {
    startDocumentationExport();
  }
});

function cancelConfirmDialog() {
  editor.value.exportDocModal.isCancelling = true;
  confirm.require({
    header: t('editor.export-cancel-dialog-title'),
    message: t('editor.export-cancel-dialog-content'),
    acceptClass: 'min-w-[120px] min-h-[45px] !font-[400] !bg-[#c22d37] hover:!bg-[#992028] ml-[10px] border-0',
    rejectClass: '!w-[120px] min-h-[45px] !font-[400]',
    acceptLabel: t('editor.export-cancel-dialog-confirm-button-message'),
    rejectLabel: t('editor.export-cancel-dialog-cancel-button-message'),
    accept: () => {
      editor.value.exportDocModal.isOpen = false;
      editor.value.exportDocModal.isCancelling = false;
      editor.value.exportDocModal.isLoading = false;
      editor.value.exportDocModal.isDownloading = false;
      editor.value.exportDocModal.data = undefined;
    },
    reject: () => {
      editor.value.exportDocModal.isCancelling = false;
    }
  });
}
</script>

<template>
  <div>
    <!--Modal frame-->
    <div 
      :class="`
        ${!editor.exportDocModal.isOpen || editor.exportDocModal.isCancelling? 'opacity-0 pointer-events-none': ''} 
        duration-300 
        fixed 
        left-[50%] 
        top-[50%] 
        translate-x-[-50%] 
        translate-y-[-50%] 
        ${!editor.exportDocModal.isError && !editor.exportDocModal.isLoading? 'w-[350px]' : 'w-[600px]'}
        max-lg:!w-full
        max-lg:!h-full
        h-[400px] 
        bg-secondary
        lg:rounded-[10px] 
        z-[600]
      `"
    >
      <div class="flex flex-col w-full h-full relative">
        <!--Close button-->
        <Button @click="cancelConfirmDialog" class="max-w-[40px] w-full max-h-[40px] h-full !absolute right-[30px] top-[20px] border-none z-[700]">
          <font-awesome-icon icon="fa-solid fa-close" class="text-[21px] text-primary/60"></font-awesome-icon>
        </Button>
        <!--Loading-->
        <div class="flex flex-col gap-[15px] justify-center items-center h-full" v-if="editor.exportDocModal.isLoading">
          <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-[50px] text-secondary" spin></font-awesome-icon>
          <h3 class="text-center w-[300px] text-primary/80">{{ $t('editor.export-modal-loading-message') }}</h3>
        </div>
        <!--Error-->
        <div class="flex flex-col items-center justify-center mt-[-10px] h-full" v-if="editor.exportDocModal.isError && !editor.exportDocModal.isLoading">
          <h2 class="text-[100px] text-secondary/80 font-[500]">Error</h2>
          <p class="max-w-[320px] text-center text-[18px] text-primary/50 font-[400] mt-[-15px]">{{ $t('editor.export-modal-error-message') }}</p>
          <Button 
            @click="startDocumentationExport"
            class="flex items-center min-w-[110px] !h-[42px] !px-[20px] !bg-primary font-[500] rounded-[5px] border-none mt-[20px]"
          >
            {{ $t('editor.export-modal-error-try-again-message') }}
          </Button>
        </div>
        <!--Download area-->
        <div class="relative h-full" v-if="!editor.exportDocModal.isError && !editor.exportDocModal.isLoading">
          <div class="relative w-full h-[80%] bg-background/80 lg:rounded-t-[10px] overflow-hidden">
            <DocPrototype
              class="absolute left-[50%] translate-x-[-50%] bottom-[-90px] max-sm:scale-[1] max-md:scale-[1.2] max-lg:scale-[1.6]"
              :colors="editor.doc.colors"
              :features="editor.doc.features"
            />
          </div>
          <div class="flex justify-center items-center h-[20%]">
            <Button 
              @click="downloadDocumentationFiles"
              class="flex items-center min-w-[170px] !h-[45px] !px-[20px] !bg-primary/80 hover:!bg-primary/50 hover:!text-primary/80 font-[500] rounded-[5px] border-none"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
    <!--Modal backdrop-->
    <div 
      @click="cancelConfirmDialog"
      :class="`
        ${!editor.exportDocModal.isOpen || editor.exportDocModal.isCancelling? 'opacity-0 pointer-events-none': ''}
        duration-300 
        fixed 
        left-0 
        top-0 
        w-screen
        h-screen
        bg-[#00000060] 
        z-[510]
      `"
    ></div>
  </div>
</template>~/shared/dfb/DocumentationFileBuilder