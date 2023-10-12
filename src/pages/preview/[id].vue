<script setup lang="ts">
import Error from '~/shared/components/Error.vue';
import Loading from '~/shared/components/Loading.vue';
import { Documentation } from '~/shared/storage/models/Documentation';
import { usePreview } from '~/shared/states/previewState';
import NavigationMenu from '~/app/preview/NavigationMenu.vue';
import IndexesTable from '~/app/preview/IndexesTable.vue';

definePageMeta({
  layout: 'preview'
})

const { params } = useRoute();
const docId = Number(params.id) || 0;

const preview = usePreview();
const pageIsLoaded = ref(false);
const docExists = ref(false);

onBeforeMount(async () => {
  const id = Number(params.id) || 0;
  const doc = await Documentation.get(id);

  // Verify if documentation exists in database
  preview.value.doc = doc;
  setTimeout(() => {
    if(doc) {
      docExists.value = true;
    } else {
      docExists.value = false;
    }
    pageIsLoaded.value = true;
  }, 500);
});

// Set the page data on currentSelectedPage was changed
watch(() => preview.value.currentSelectedPage, (newPage) => {
  const contentElem = document.querySelector('#pulsar-current-page-content');

  if(!contentElem) return;
  contentElem.innerHTML = newPage?.content || '';
});

// Load initial page
watch(() => preview.value.doc, () => {
  setTimeout(() => {
    const firstCategory = preview.value.doc?.categories[0];
    const page = preview.value.doc?.pages.filter(p => p.categoryId === firstCategory?.id);

    if(page) {
      preview.value.currentSelectedPage = page[0];
    }
  }, 500);
});
</script>

<template>
  <Head>
    <Title>{{ $t('preview.title') + ' ' + docId }}</Title>
  </Head>
  <main class="pulsar-page-main" v-if="docExists && pageIsLoaded">
    <div class="pulsar-page-wrapper">
      <!--Navbar-->
      <nav class="pulsar-doc-navbar">
        <!-- Open navigation menu button-->
        <button 
          @click="preview.navigationMenuIsOpen = true"
          :style="{ color: preview.doc?.colors.text + 'b9' }"
        >
          <font-awesome-icon icon="fa-solid fa-bars" :style="{ fontSize: '30px' }"></font-awesome-icon>
        </button>
      </nav>
      <hr class="pulsar-doc-navbar-divider pulsar-divider" />
      <div class="pulsar-doc-page-nav-doc-indexes-table-container">
        <NavigationMenu />
        <!--Content-->
        <div 
          id="pulsar-current-page-content" 
          :style="{ 
            width: '100%',
            wordBreak: 'break-word'
          }"
        ></div>
        <IndexesTable />
      </div>
    </div>
  </main>
  <!--Loading and Error component-->
  <Loading v-if="!pageIsLoaded" />
  <Error 
    v-if="!docExists && pageIsLoaded"
    :status="404"
    :message="$t('editor.error-notfound-message')"
    :redirect-button-label="$t('editor.error-notfound-button-label')"
    redirect-path="/documentations"
  />
</template>

<style lang="scss">
  .pulsar-page-main {
    background-color: v-bind('preview.doc?.colors.background');
  }

  .pulsar-page-wrapper {
    max-width: 2120px;
    margin: 0 auto;
    min-height: 100vh;
    padding: 50px;
  }

  body {
    font-family: Roboto;
    font-weight: 400;
  }

  .pulsar-utils-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pulsar-doc-navbar {
    display: none;
    align-items: center;
    width: 100%;
    padding-bottom: 25px;
  }

  .pulsar-doc-navbar-divider {
    display: none;
    margin-bottom: 50px;
  }

  .pulsar-doc-page-nav-doc-indexes-table-container {
    display: flex;
    gap: 60px;
  }

  .pulsar-heading {
    font-weight: 500;
    color: v-bind('preview.doc?.colors.text');
  }

  .pulsar-heading-1 {
    font-size: 35px;
  }

  .pulsar-heading-2 {
    font-size: 30px;
  }

  .pulsar-heading-3 {
    font-size: 25px;
  }

  .pulsar-heading-4 {
    font-size: 22px;
  }

  .pulsar-paragraph {
    font-size: 16px;
    font-weight: 400;
    color: v-bind('preview.doc?.colors.text + "b9"')
  }

  .pulsar-paragraph:empty::after {
    content: "\00A0";
  }

  .pulsar-divider {
    width: 100%;
    height: 1px;
    border: none;
    background-color: v-bind('preview.doc?.colors.divider');
  }

  .pulsar-link {
    font-size: 16px;
    font-weight: 400;
    color: v-bind('preview.doc?.colors.primary');
  }

  .pulsar-bulletlist {
    padding: 0 1rem;
    list-style: disc;
    color: v-bind('preview.doc?.colors.text');
  }

  .pulsar-table {
    width: auto;
    border-collapse: collapse;
    table-layout: fixed;
    margin: 0;
    overflow: hidden;
  }
  
  .pulsar-table td, th {
    min-width: 1em;
    border: 2px solid v-bind('preview.doc?.colors.secondary');
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }

  .pulsar-table th {
    font-weight: bold;
    text-align: left;
    background-color: v-bind('preview.doc?.colors.secondary');
  }

  /* CodeBlock */
  pre {
    background-color: v-bind('preview.doc?.colors.secondary');
    color: v-bind('preview.doc?.colors.codeBlockText');
    font-weight: 400;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    overflow-x: scroll;
    white-space: pre !important;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 16px;
    }

    .hljs-comment, .hljs-quote { color: v-bind('preview.doc?.colors.codeBlockComments'); }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: v-bind('preview.doc?.colors.codeBlockVariable');
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: v-bind('preview.doc?.colors.codeBlockLiteral');
    }

    .hljs-string, .hljs-symbol, .hljs-bullet { color: v-bind('preview.doc?.colors.codeBlockString'); }

    .hljs-title, .hljs-section { color: v-bind('preview.doc?.colors.codeBlockSection'); }

    .hljs-keyword, .hljs-selector-tag { color: v-bind('preview.doc?.colors.codeBlockKeyword'); }

    .hljs-emphasis { font-style: italic;}

    .hljs-strong { font-weight: 700; }
  }

  /* 2xl */
  @media only screen and (max-width: 1180px) {
    .pulsar-page-wrapper {
      flex-direction: column;
    }

    .pulsar-doc-navbar {
      display: flex;
    }

    .pulsar-doc-navbar-divider {
      display: block;
    }

    .pulsar-doc-page-nav-doc-indexes-table-container {
      gap: 0px;
    }
  }
</style>