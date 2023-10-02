<script setup lang="ts">
import { useEditor, Editor, EditorEvents, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { IDocumentationColorPalette } from '../storage/models/Documentation';

// Code highlight languages
import js from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import csharp from 'highlight.js/lib/languages/csharp';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import rust from 'highlight.js/lib/languages/rust';
import elixir from 'highlight.js/lib/languages/elixir';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import kotlin from 'highlight.js/lib/languages/kotlin';
import python from 'highlight.js/lib/languages/python';
import julia from 'highlight.js/lib/languages/julia';
import graphql from 'highlight.js/lib/languages/graphql';
import haml from 'highlight.js/lib/languages/haml';
import django from 'highlight.js/lib/languages/django';
import haskell from 'highlight.js/lib/languages/haskell';
import dart from 'highlight.js/lib/languages/dart';
import fortran from 'highlight.js/lib/languages/fortran';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  colors: IDocumentationColorPalette,
  content: string
}>();

const lowlight = createLowlight();

lowlight.register({ js });
lowlight.register({ css });
lowlight.register({ typescript });
lowlight.register({ csharp });
lowlight.register({ c });
lowlight.register({ cpp });
lowlight.register({ rust });
lowlight.register({ elixir });
lowlight.register({ go });
lowlight.register({ java });
lowlight.register({ xml });
lowlight.register({ kotlin });
lowlight.register({ python });
lowlight.register({ julia });
lowlight.register({ graphql });
lowlight.register({ haml });
lowlight.register({ django });
lowlight.register({ haskell });
lowlight.register({ dart });
lowlight.register({ fortran });

// Set a new link if the text match with regex
function handleTypedLinks(props: EditorEvents['selectionUpdate']) {
  const text = props.editor.getText();
  const textArray = text.split(' ');
  const lastWord = textArray[textArray.length - 1];
  const linkValidationRegex = /\b(?:https?:\/\/)[a-zA-Z]+\.[a-zA-Z]+\b/;
  const selectionStart = text.length - lastWord.length;
  const selectionEnd = text.length;
  const initialCursorPosition = props.editor.state.selection.anchor;

  // Validate if last word typed is a link
  if(linkValidationRegex.test(lastWord) && props.transaction.docChanged) {
    props.editor.commands.setTextSelection({ from: selectionStart, to: selectionEnd + 3 })
    props.editor.commands.setLink({
      target: '_blank',
      href: lastWord,
      rel: 'noreferrer'
    });
    props.editor.commands.setTextSelection(initialCursorPosition);
  } else if(props.transaction.docChanged) {
    props.editor.commands.setTextSelection({ from: selectionStart, to: selectionEnd + 3 })
    props.editor.commands.unsetLink();
    props.editor.commands.setTextSelection(initialCursorPosition);
  }
}

const editor = useEditor({
  content: JSON.parse(JSON.stringify(props.content)),
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4]
      },
      horizontalRule: {
        HTMLAttributes: {
          class: 'w-full h-[1px] border-none',
          style: `background-color: ${props.colors.divider} !important;`
        }
      },
      codeBlock: false
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return `Your H${node.attrs.level} is empty`;
        }
        return 'Write something ...';
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
    CodeBlockLowlight.configure({
      lowlight
    })
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML());
  },
  onSelectionUpdate: (props) => {
    handleTypedLinks(props);
  }
});

watch(() => props.content, (value) => {
  if(!editor) return;
  if(editor.value?.getHTML() === props.content) return;

  editor.value?.commands.setContent(value, true);
});

onBeforeUnmount(() => {
  if(!editor.value) return;
  editor.value.destroy();
})
</script>

<template>
  <EditorContent class="w-full min-h-[50px]" :editor="editor" />
</template>

<style lang="scss">
.tiptap h1,h2,h3,h4 {
  color: v-bind('props.colors.text');
  font-weight: 500;
}

.tiptap h1 {
  font-size: 35px;
}

.tiptap h2 {
  font-size: 30px;
}

.tiptap h3 {
  font-size: 25px;
}

.tiptap h4 {
  font-size: 22px;
}

.tiptap p {
  color: v-bind('props.colors.text + "90"')
}

.tiptap a {
  color: v-bind('props.colors.primary');
}

.tiptap .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: v-bind('props.colors.text + "50"');
  pointer-events: none;
  height: 0;
}

.ProseMirror:focus-visible {
  outline: none;
}

.tiptap {
  pre {
    background-color: v-bind('props.colors.secondary');
    color: #FFF;
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

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

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
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-title,
    .hljs-section {
      color: #FAF594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }
}
</style>