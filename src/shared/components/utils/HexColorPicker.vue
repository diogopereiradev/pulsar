<script setup lang="ts">
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import OverlayPanel from 'primevue/overlaypanel';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{ 
  modelValue: string | undefined,
  togglerButton?: {
    width?: string,
    height?: string
  }
}>();
const overlay = ref<OverlayPanel>();
</script>

<template>
  <div>
    <button
      type="button"
      @click="overlay?.toggle($event)"
      class="w-20 h-8 rounded-lg border-primary/40 border-[1px] border-solid"
      :style="{
        backgroundColor: modelValue || 'transparent',
        width: props.togglerButton?.width && props.togglerButton.width + ' !important',
        height: props.togglerButton?.height && props.togglerButton.height + ' !important'
      }"
    ></button>
    <OverlayPanel 
      ref="overlay"
      :pt="{
        root: 'before:!hidden'
      }"
    >
      <div class="flex flex-col bg-secondary rounded-b-lg">
        <ColorPicker
          :model-value="modelValue"
          @update:model-value="(val: string) => $emit('update:modelValue', val)"
          format="hex"
          :inline="true"
        />
        <div class="flex items-center justify-between gap-1.5 px-5 py-2.5">
          <label class="text-[15px] text-primary/90 font-medium">Hex</label>
          <InputText 
            @blur="$emit('update:modelValue', ($event?.currentTarget as HTMLInputElement).value)"
            class="max-w-[120px] !h-9"
            :value="modelValue"
            maxlength="7"
          />
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>