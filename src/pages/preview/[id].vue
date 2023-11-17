<script setup lang="ts">
import { IDocumentation } from '~/@types/declarations/Documentation';
import PageStates from '~/shared/components/PageStates.vue';
import { Html } from '~/shared/dfb/files/src/Html';
import { Script } from '~/shared/dfb/files/src/assets/Script';
import { PreviewRouter } from '~/shared/dfb/utils/PreviewRouter';
import { PreviewCustomizations } from '~/shared/dfb/utils/PreviewCustomizations';

definePageMeta({
  layout: 'preview',
  middleware: 'authentication'
});

const { params } = useRoute();
const pageIsLoaded = ref(false);
const pageIsError = ref(false);
const doc = ref<IDocumentation | undefined>();

// Load the page when iframe is loaded
async function iframeLoad(ev: Event) {
  const iframe = ev.currentTarget as HTMLIFrameElement;
  
  if(iframe.contentDocument && doc.value) {
    const html = await Html(doc.value.pages[0], doc.value, { isToPreview: true });
    iframe.contentDocument.documentElement.innerHTML = html;

    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://kit.fontawesome.com/813705bae2.js';
    fontAwesomeScript.crossOrigin = 'anonymous';

    const bufferScript = document.createElement('script');
    bufferScript.type = 'module';
    bufferScript.src = 'https://bundle.run/buffer@6.0.3';
    bufferScript.crossOrigin = 'anonymous';

    const routes = doc.value.pages.map(route => ({
      id: route.id,
      title: route.title
    }));
    const routerScript = document.createElement('script');
    routerScript.type = 'module';
    routerScript.innerHTML = PreviewRouter(doc.value.id, routes);

    const customizationsScript = document.createElement('script');
    customizationsScript.type = 'module';
    customizationsScript.innerHTML = PreviewCustomizations(doc.value.customizations);

    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = Script(doc.value);
    
    iframe.contentDocument.head.appendChild(fontAwesomeScript);
    iframe.contentDocument.head.appendChild(bufferScript);
    iframe.contentDocument.body.appendChild(customizationsScript);
    iframe.contentDocument.body.appendChild(script);
    iframe.contentDocument.body.appendChild(routerScript);
  }
}

// Load documentation
onBeforeMount(async () => {
  const result = await $fetch(`/api/docs/getDoc?id=${params.id}`, {
    method: 'GET'
  });
  const typedResult = result as { count: number, limit: number, docs: IDocumentation[] };
  
  if(typedResult && typedResult.docs.length > 0) {
    doc.value = typedResult.docs[0];
    pageIsLoaded.value = true;
  } else {
    pageIsError.value = true;
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
    :is-loaded="pageIsLoaded"
    :is-error="pageIsError"
  >
    <main>
      <iframe 
        @load="iframeLoad($event)" 
        class="w-screen h-screen"
      ></iframe>
    </main>
  </PageStates>
</template>