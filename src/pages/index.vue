<script setup lang="ts">
import Header from '~/app/home/Header.vue';
import FeaturesCards from '~/app/home/FeaturesCards.vue';
</script>

<template>
  <Head>
    <Title>{{ $t('home.title') }}</Title>
  </Head>
  <div class="flex flex-col">
    <Header />
    <FeaturesCards />
  </div>
</template>