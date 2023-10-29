<script setup lang="ts">
import DatabaseSync from '~/shared/components/DatabaseSync.vue';
import { Documentation, IDocumentation } from '~/database/models/Documentation';
import PageStates from '~/shared/components/PageStates.vue';
import { Html } from '~/shared/dfb/files/src/Html';
import { Script } from '~/shared/dfb/files/src/assets/Script';
import { PreviewRouter } from '~/shared/dfb/utils/PreviewRouter';
import { PreviewCustomizations } from '~/shared/dfb/utils/PreviewCustomizations';

definePageMeta({
  layout: 'preview'
});

const { params } = useRoute();
const doc = ref<IDocumentation | undefined>();

// Load the page when iframe is loaded
function iframeLoad(ev: Event) {
  const iframe = ev.currentTarget as HTMLIFrameElement;
  
  if(iframe.contentDocument && doc.value) {
    iframe.contentDocument.documentElement.innerHTML = Html(doc.value.pages[0], doc.value, { isToPreview: true });

    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://kit.fontawesome.com/813705bae2.js';
    fontAwesomeScript.crossOrigin = 'anonymous';

    const routes = doc.value.pages.map(route => ({
      id: route.id,
      title: route.title, 
      content: route.content 
    }));
    const routerScript = document.createElement('script');
    routerScript.type = 'module';
    routerScript.innerHTML = PreviewRouter(routes);

    const customizationsScript = document.createElement('script');
    customizationsScript.type = 'module';
    customizationsScript.innerHTML = PreviewCustomizations(doc.value.customizations);

    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = Script(doc.value);
    
    iframe.contentDocument.head.appendChild(fontAwesomeScript);
    iframe.contentDocument.body.appendChild(customizationsScript);
    iframe.contentDocument.body.appendChild(script);
    iframe.contentDocument.body.appendChild(routerScript);
  }
}

// Load documentation
onBeforeMount(async () => {
  const result = await Documentation.get(Number(params.id));

  if(result) {
    doc.value = result;
  } else {
    alert('Error on loading doc');
  }
});
</script>

<template>
  <Head>
    <Title>{{ $t('preview.title') + ' ' + params.id }}</Title>
  </Head>
  <PageStates
    :error="{
      status: 404,
      redirectPath: '/documentations'
    }"
    :success-condition="async () => (await Documentation.get(Number(params.id))? true : false)"
  >
    <main>
      <iframe 
        @load="iframeLoad($event)" 
        class="w-screen h-screen"
      ></iframe>
      <DatabaseSync :doc-id="Number(params.id)" />
    </main>
  </PageStates>
</template>