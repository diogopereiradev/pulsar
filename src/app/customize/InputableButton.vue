<script setup lang="ts">
import InputText from 'primevue/inputtext';

defineProps<{ buttonClass: string, loadingIconClass: string, inputTextClass: string }>();
const emit = defineEmits(['update:submit']);

const value = ref('');
const isOpen = ref(false);
const isLoading = ref(false);

async function handleSubmit() {
  isOpen.value = false;
  isLoading.value = true;
  await emit('update:submit', value.value);
  if(value.value) {
    setTimeout(() => isLoading.value = false, 500);
  } else {
    isLoading.value = false;
  }
  value.value = '';
}
</script>

<template>
  <div>
    <!--Open Button-->
    <Button 
      @click="isOpen = true"
      v-if="!isOpen && !isLoading"
      :class="`gap-[10px] !bg-[#404040]/40 !text-[15px] hover:!bg-[#404040]/20 !px-[10px] !py-[3px] border-none ${buttonClass}`"
    >
      <slot />
    </Button>
    <!--Loading-->
    <div v-else-if="isLoading && !isOpen" class="w-[110px] flex justify-center">
      <font-awesome-icon 
        icon="fa-solid fa-circle-notch" 
        :class="loadingIconClass"
        spin
      ></font-awesome-icon>
    </div>
    <!--Input-->
    <form @submit.prevent="handleSubmit" v-else>
      <InputText
        v-model="value"
        @blur="handleSubmit"
        v-focus
        :class="inputTextClass"
      />
    </form>
  </div>
</template>