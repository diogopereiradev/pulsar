<script setup lang="ts">
import { IDocumentation, IDocumentationCustomization } from '~/@types/declarations/Documentation';
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
  const result = await $fetch(`/api/docs/getDoc?id=${params.id}`, {
    method: 'GET'
  });
  const typedResult = result as { count: number, limit: number, docs: IDocumentation[] };
  const doc = typedResult.docs[0];
  
  if(!typedResult || typedResult.docs.length < 1) {
    pageIsError.value = true;
    return;
  }

  const iframe = ev as HTMLIFrameElement;
  
  if(iframe.contentDocument && doc) {
    const html = await Html(doc.pages[0], doc, { isToPreview: true });
    iframe.contentDocument.documentElement.innerHTML = html;

    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://kit.fontawesome.com/813705bae2.js';
    fontAwesomeScript.crossOrigin = 'anonymous';

    const routes = doc.pages.map(route => ({
      id: route.id,
      title: route.title
    }));
    const routerScript = document.createElement('script');
    routerScript.type = 'module';
    routerScript.innerHTML = PreviewRouter(doc, routes);

    const customizationsScript = document.createElement('script');
    customizationsScript.type = 'module';

    const customizations = await Promise.all(doc.customizations.map(async c => {
      const content = await getCustomizationsContent(doc, c);
      
      if(content.html) {
        return {
          ...c,
          content
        };
      } else {
        return c;
      }
    }));
    customizationsScript.innerHTML = PreviewCustomizations(doc, customizations);

    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = Script(doc);
    
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
  const iframe = document.querySelector<HTMLIFrameElement>('#preview-iframe');
  iframeLoad(iframe!);
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
    alwaysShowSlot
  >
    <main :class="`${pageIsLoaded? '' : 'opacity-0 pointer-events-none !h-0'}`">
      <iframe 
        id="preview-iframe"
        class="w-screen h-screen"
        target="_parent"
      ></iframe>
    </main>
  </PageStates>
</template>