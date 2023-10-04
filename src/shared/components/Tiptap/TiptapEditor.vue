<script setup lang="ts">
import { lowlight } from './hljsConfig';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import SlashCommandsPopup from './SlashCommandsPopup.vue';
import SelectionBubbleMenu from './SelectionBubbleMenu.vue';
import TableControlsMenu from './TableControlsMenu.vue';
import { IDocumentationColorPalette } from '../../storage/models/Documentation';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  colors: IDocumentationColorPalette,
  content: string
}>();

const { t } = useI18n();

const editor = useEditor({
  content: JSON.parse(JSON.stringify(props.content)),
  extensions: [
    StarterKit.configure({
      horizontalRule: {
        HTMLAttributes: {
          class: 'w-full h-[1px] border-none',
          style: `background-color: ${props.colors.divider} !important;`
        }
      },
      bulletList: {
        keepMarks: true
      },
      heading: false,
      codeBlock: false
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return `H${node.attrs.level} ${t('markdowneditor.is-empty-message')}`;
        }
        return t('markdowneditor.line-is-empty-placeholder');
      }
    }),
    Markdown.configure({
      html: true,
      linkify: true,
      bulletListMarker: '-',
      tightListClass: 'tight',
      breaks: false,
      tightLists: true,
      transformCopiedText: true,
      transformPastedText: true
    }),
    Link.configure({
      protocols: ['https', 'http'],
      autolink: false,
      linkOnPaste: true,
      HTMLAttributes: {
        class: 'cursor-pointer'
      }
    }),
    CodeBlockLowlight.configure({ lowlight }),
    BubbleMenuExtension,
    Table.configure({ 
      resizable: true 
    }),
    Heading
    .configure({
      levels: [1, 2, 3, 4]
    })
    .extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          class: {
            default: null,
            renderHTML(attributes) {
              return {
                class: attributes.level === 1? 'tiptap-heading-element' : null 
              }
            },
          }
        }
      }
    }),
    TableHeader,
    TableCell,
    TableRow,
    Image
  ],
  onUpdate: () => {
    // Send current editor html content to external components using emit event
    emit('update:modelValue', editor.value?.getHTML());
  }
});

// Set editor content on props.content was changed
watch(() => props.content, (value) => {
  if(!editor) return;
  if(editor.value?.getHTML() === props.content) return;

  editor.value?.commands.setContent(value, true);
});
</script>

<template>
  <div>
    <SelectionBubbleMenu
      :editor="editor"
      :colors="props.colors"
    />
    <SlashCommandsPopup
      :editor="editor"
      :colors="props.colors"
    />
    <TableControlsMenu
      :editor="editor"
      :colors="props.colors"
    />
    <!--Editor container-->
    <editor-content class="w-full min-h-[50px]" :editor="editor" />
  </div>
</template>

<style lang="scss">
// Disable editor outline border on click
.ProseMirror:focus-visible {
  outline: none;
}

.tiptap {
  // Headings
  h1, h2, h3, h4 {
    color: v-bind('props.colors.text');
    font-weight: 500;
  }

  h1 { font-size: 35px; }

  h2 { font-size: 30px; }

  h3 { font-size: 25px; }

  h4 { font-size: 22px; }

  // Paragraph
  p { color: v-bind('props.colors.text + "b9"'); }

  // Link
  a { color: v-bind('props.colors.primary'); }

  // BulletList
  ul,
  ol {
    padding: 0 1rem;
    list-style: disc;
    color: v-bind('colors.text');
  }

  //Placeholder
  .is-empty::before {
    content: attr(data-placeholder);
    float: left;
    color: v-bind('props.colors.text + "50"');
    pointer-events: none;
    height: 0;
  }

  // Image
  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;

    &.ProseMirror-selectednode {
      outline: 3px solid v-bind('colors.primary');
    }
  }

  // CodeBlock
  pre {
    background-color: v-bind('props.colors.secondary');
    color: #d8d6d6;
    font-family: Roboto;
    font-weight: 400;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 16px;
    }

    .hljs-comment, .hljs-quote { color: #616161; }

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
      color: #F98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #9a66dd;
    }

    .hljs-string, .hljs-symbol, .hljs-bullet { color: #B9F18D; }

    .hljs-title, .hljs-section { color: #86d667; }

    .hljs-keyword, .hljs-selector-tag { color: #896db6; }

    .hljs-emphasis { font-style: italic;}

    .hljs-strong { font-weight: 700; }
  }

  // Tables
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid v-bind('colors.secondary');
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * { margin-bottom: 0; }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: v-bind('colors.secondary');
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0; right: 0; top: 0; bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: v-bind('colors.primary');
      pointer-events: none;
    }

    p { margin: 0; }
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>