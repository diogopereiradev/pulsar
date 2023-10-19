<script setup lang="ts">
import Loading from './utils/Loading.vue';
import Error from './utils/Error.vue';

type Props = {
  error: {
    status: number
    redirectPath: string
  },
  successCondition: () => Promise<boolean>
};

const props = defineProps<Props>();

const state = ref({
  isLoading: true,
  isSuccess: false,
  isError: false,
  conditionData: undefined
});

onBeforeMount(() => {
  // A delay to loading state
  setTimeout(async () => {
   const result = await props.successCondition();

   if(result) {
    state.value.isLoading = false;
    state.value.isSuccess = true;
   } else {
    state.value.isLoading = false;
    state.value.isError = true;
   }
  }, 500);
});
</script>

<template>
  <slot v-if="state.isSuccess"/>
  <Loading v-if="state.isLoading"/>
  <Error
    v-if="state.isError"
    :status="error.status"
    :message="$t('pagestates.error-notfound-message')"
    :redirect-button-label="$t('pagestates.error-notfound-button-label')"
    :redirect-path="error.redirectPath"
  />
</template>