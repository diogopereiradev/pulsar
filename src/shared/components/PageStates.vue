<script setup lang="ts">
import Loading from './utils/Loading.vue';
import Error from './utils/Error.vue';

type Props = {
  error: {
    status: number
    redirectPath: string
  },
  isLoaded: boolean,
  isError: boolean,
  alwaysShowSlot?: boolean
};

const props = defineProps<Props>();

const state = ref({
  isLoading: true,
  isSuccess: false,
  isError: false
});

watch([() => props.isLoaded, () => props.isError], ([loaded, error]) => {
  if(loaded) {
   state.value.isLoading = false;
   state.value.isSuccess = true;
  }
  
  if(error) {
   state.value.isLoading = false;
   state.value.isError = true;
  }
});
</script>

<template>
  <slot v-if="state.isSuccess || alwaysShowSlot"/>
  <Loading v-if="state.isLoading"/>
  <Error
    v-if="state.isError"
    :status="error.status"
    :message="$t('pagestates.error-notfound-message')"
    :redirect-button-label="$t('pagestates.error-notfound-button-label')"
    :redirect-path="error.redirectPath"
  />
</template>