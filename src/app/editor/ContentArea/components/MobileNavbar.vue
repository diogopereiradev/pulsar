<script setup lang="ts">
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';

defineEmits(['open']);
const docSaver = inject('docSaver') as DocSaverReturnType;
</script>

<template>
  <nav class="2xl:hidden flex items-center w-full pb-6">
    <Button @click="$emit('open')" class="border-none !bg-transparent hover:!bg-transparent !p-1.5">
      <font-awesome-icon 
        icon="fa-solid fa-bars"
        class="text-3xl"
      ></font-awesome-icon>
    </Button>
  </nav>
  <hr class="2xl:hidden w-full mx-auto h-0.5 border-none" :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.divider }" />
</template>