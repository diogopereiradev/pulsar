<script setup lang="ts">
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';

const docSaver = inject('docSaver') as DocSaverReturnType;
</script>

<template>
  <div>
    <div v-if="docSaver.data.value.unsavedData.messages.navigationTitle" class="max-w-[220px] flex items-center gap-3.5">
      <div
        class="flex justify-center items-center w-12 h-12 rounded-lg"
        :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.primary + '40' }"
      >
        <font-awesome-icon 
          icon="fa-solid fa-map" 
          class="text-[19px]"
          :style="{ color: docSaver.data.value.unsavedData.colors.primary }"
        />
      </div>
      <div class="flex flex-col">
        <p :title="docSaver.data.value.unsavedData.messages.navigationTitle" class="max-w-[150px] text-[17px] truncate" :style="{ color: docSaver.data.value.unsavedData.colors.text + '99' }">
          {{ docSaver.data.value.unsavedData.messages.navigationTitle }}
        </p>
        <p :title="docSaver.data.value.unsavedData.messages.navigationSubTitle" class="max-w-[150px] relative text-[15px] -mt-1 truncate" :style="{ color: docSaver.data.value.unsavedData.colors.text + '80' }">
          {{ docSaver.data.value.unsavedData.messages.navigationSubTitle }}
        </p>
      </div>
    </div>
    <hr v-if="docSaver.data.value.unsavedData.messages.navigationTitle" class="w-full mx-auto h-0.5 border-none mt-5" :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.divider + '40' }" />
  </div>
</template>