<script setup lang="ts">
import { PageSaverReturnType } from '~/shared/compositions/usePageSave';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';

const pageSaver = inject('pageSaver') as PageSaverReturnType;
const docSaver = inject('docSaver') as DocSaverReturnType;
</script>

<template>
  <div class="w-full flex items-center gap-3 justify-end mb-6" v-if="pageSaver.data.value.currentSelectedPage.id !== '-1' && !pageSaver.data.value.isLoadingContent">
    <div class="px-5 py-1.5 rounded-[10px] shadow" :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.secondary + '80' }">
      <div class="flex items-center gap-3" v-if="!pageSaver.data.value.status.isSaved && !pageSaver.data.value.status.isTyping">
        <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-lg" :style="{ color: docSaver.data.value.unsavedData.colors.primary }" spin></font-awesome-icon>
        <h2 class="text-base" :style="{ color: docSaver.data.value.unsavedData.colors.text }">{{ $t('editor.editor-saving-message') }}</h2>
      </div>
      <div class="flex items-center gap-3" v-else-if="pageSaver.data.value.status.isTyping">
        <font-awesome-icon icon="fa-solid fa-keyboard" class="text-lg" :style="{ color: docSaver.data.value.unsavedData.colors.primary }" beat-fade></font-awesome-icon>
        <h2 class="text-base" :style="{ color: docSaver.data.value.unsavedData.colors.text }">{{ $t('editor.editor-typing-message') }}</h2>
      </div>
      <div class="flex items-center gap-3" v-else-if="!pageSaver.data.value.status.isTyping">
        <font-awesome-icon icon="fa-solid fa-check" class="text-lg" :style="{ color: docSaver.data.value.unsavedData.colors.primary }"></font-awesome-icon>
        <h2 class="text-base" :style="{ color: docSaver.data.value.unsavedData.colors.text }">{{ $t('editor.editor-saved-message') }}</h2>
      </div>
    </div>
  </div>
</template>