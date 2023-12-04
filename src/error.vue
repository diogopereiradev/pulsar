<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number,
    message: string
  }
}>();

const backHandle = () => clearError({ redirect: '/' });
</script>

<template>
  <main class="flex flex-col justify-center items-center h-screen">
    <h1 class="font-default text-[120px] font-bold text-secondary">{{ error.statusCode }}</h1>
    <p class="text-center text-[8vw] md:text-[40px] text-white/70 -mt-8">{{ error.message }}</p>
    <button @click="backHandle" class="w-[200px] h-[45px] back-button-gradient border-[2px] border-primary/40 rounded-[10px] mt-7">
      <span class="back-button-text-gradient">Back to Home</span>
    </button>
    <div class="absolute w-[300px] h-[300px] rounded-full blur-[300px] bg-primary/10 z-[-1]"></div>
  </main>
</template>

<style scoped>
  .back-button-gradient {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191,0.2) 100%); 
  }

  .back-button-gradient:hover {
    background: linear-gradient(180deg, rgba(25,29,43,0) 0%, rgba(111,97,191, 0.3) 100%);
  }

  .back-button-text-gradient {
    background: linear-gradient(-90deg, rgba(234,205,240,1) 0%, rgba(158,146,232,1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>