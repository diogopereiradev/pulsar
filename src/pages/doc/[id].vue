<script setup lang="ts">
import { IDocumentation, IDocumentationCustomization } from '~/@types/declarations/Documentation';
import PageStates from '~/shared/components/PageStates.vue';
import { Html } from '~/shared/dfb/files/src/Html';
import { Script } from '~/shared/dfb/files/src/assets/Script';
import { PreviewRouter } from '~/shared/dfb/utils/PreviewRouter';
import { PreviewCustomizations } from '~/shared/dfb/utils/PreviewCustomizations';

definePageMeta({
  layout: 'preview'
});

const { params } = useRoute();
const pageIsLoaded = ref(false);
const pageIsError = ref(false);
const doc = ref<IDocumentation>();

async function getCustomizationsContent(doc: IDocumentation, customization: IDocumentationCustomization) {
  let content: { html?: string, css?: string, javascript?: string } = {};

  const result = await fetch('/api/readStream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'customization',
      docId: doc.id,
      id: customization.id,
      authorIdentifier: doc.authorIdentifier
    })
  });

  const reader = result.body?.getReader();

  const read = async () => {
    const { done, value } = await reader!.read();
    if(done) {
      reader?.releaseLock();
      return;
    }

    const decoder = new TextDecoder('utf-8')
    const bufferToString = JSON.parse(decoder.decode(value));
    content = bufferToString;
    read();
  };
  await read();
  return content;
}

// Load the page when iframe is loaded
async function iframeLoad(ev: HTMLIFrameElement) {
  try {
    const result = await $fetch(`/api/docs/getPublicDoc`, {
      method: 'POST',
      body: {
        id: params.id
      }
    });
    const typedResult = result as IDocumentation;
    
    if(!typedResult.id) {
      pageIsError.value = true;
      return;
    }
    
    doc.value = typedResult;
  } catch {
    pageIsError.value = true;
    return;
  }

  const iframe = ev as HTMLIFrameElement;
  
  if(iframe.contentDocument && doc) {
    const html = await Html(doc.value.pages[0], doc.value, { isToPreview: true });
    iframe.contentDocument.documentElement.innerHTML = html;

    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://kit.fontawesome.com/813705bae2.js';
    fontAwesomeScript.crossOrigin = 'anonymous';

    const routes = doc.value.pages.map(route => ({
      id: route.id,
      title: route.title
    }));
    const routerScript = document.createElement('script');
    routerScript.type = 'module';
    routerScript.innerHTML = PreviewRouter(doc.value, routes);

    const customizationsScript = document.createElement('script');
    customizationsScript.type = 'module';

    const customizations = await Promise.all(doc.value.customizations.map(async c => {
      const content = await getCustomizationsContent(doc.value!, c);
      
      if(content.html) {
        return {
          ...c,
          content
        };
      } else {
        return c;
      }
    }));
    customizationsScript.innerHTML = PreviewCustomizations(doc.value, customizations);

    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = Script(doc.value);
    
    iframe.contentDocument.head.appendChild(fontAwesomeScript);
    iframe.contentDocument.body.appendChild(customizationsScript);
    iframe.contentDocument.body.appendChild(script);
    iframe.contentDocument.body.appendChild(routerScript);

    setTimeout(() => {
      pageIsLoaded.value = true;
    }, 1000);
  }
}

onMounted(() => {
  const iframe = document.querySelector<HTMLIFrameElement>('#doc-iframe');
  iframeLoad(iframe!);
});
</script>

<template>
  <Head>
    <Title>{{ doc?.title || 'Pulsar' }}</Title>
  </Head>
  <PageStates
    :error="{
      status: 404,
      redirectPath: '/documentations'
    }"
    :is-loaded="pageIsLoaded"
    :is-error="pageIsError"
    alwaysShowSlot
  >
    <main :class="`${pageIsLoaded? '' : 'opacity-0 pointer-events-none !h-0'}`">
      <iframe 
        id="doc-iframe"
        class="w-screen h-screen"
      ></iframe>
    </main>
  </PageStates>
</template>