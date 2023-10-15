<script setup lang="ts">
import { Editor, FloatingMenu } from '@tiptap/vue-3';
import InputText from 'primevue/inputtext';
import { IDocumentationColorPalette } from '~/shared/storage/models/Documentation';

const { t } = useI18n();

type Slash = {
  search: string,
  commands: {
    icon: {
      icon: string,
      class: string
    },
    title: string,
    description: string,
    executor: () => void
  }[]
};

const props = defineProps<{
  editor: Editor | undefined,
  colors: IDocumentationColorPalette
}>();

const slash = ref<Slash>({
  search: '',
  commands: [
    {
      icon: {
        icon: 'fa-solid fa-table',
        class: 'text-[20px]'
      },
      title: t('markdowneditor.slashcommands-popup-table-title'),
      description: t('markdowneditor.slashcommands-popup-table-description'),
      executor() {
        handleCreateTable();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-[20px]'
      },
      title: t('markdowneditor.slashcommands-popup-heading-1-title'),
      description: t('markdowneditor.slashcommands-popup-heading-1-description'),
      executor() {
        handleCreateHeading1();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-[20px]'
      },
      title: t('markdowneditor.slashcommands-popup-heading-2-title'),
      description: t('markdowneditor.slashcommands-popup-heading-2-description'),
      executor() {
        handleCreateHeading2();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-[20px]'
      },
      title: t('markdowneditor.slashcommands-popup-heading-3-title'),
      description: t('markdowneditor.slashcommands-popup-heading-3-description'),
      executor() {
        handleCreateHeading3();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-[20px]'
      },
      title: t('markdowneditor.slashcommands-popup-heading-4-title'),
      description: t('markdowneditor.slashcommands-popup-heading-4-description'),
      executor() {
        handleCreateHeading4();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-image',
        class: 'text-[20px]'
      },
      title: t('markdowneditor.slashcommands-popup-image-title'),
      description: t('markdowneditor.slashcommands-popup-image-description'),
      executor() {
        handleCreateImage();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-list',
        class: 'text-[18px]'
      },
      title: t('markdowneditor.slashcommands-popup-bulletlist-title'),
      description: t('markdowneditor.slashcommands-popup-bulletlist-description'),
      executor() {
        handleBulletList();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-list-ol',
        class: 'text-[19px]'
      },
      title: t('markdowneditor.slashcommands-popup-numberedlist-title'),
      description: t('markdowneditor.slashcommands-popup-numberedlist-description'),
      executor() {
        handleNumberedList();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-lines-leaning',
        class: 'text-[19px]'
      },
      title: t('markdowneditor.slashcommands-popup-divider-title'),
      description: t('markdowneditor.slashcommands-popup-divider-description'),
      executor() {
        handleCreateDivider();
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-code',
        class: 'text-[18px]'
      },
      title: t('markdowneditor.slashcommands-popup-codeblocks-title'),
      description: t('markdowneditor.slashcommands-popup-codeblocks-description'),
      executor() {
        handleCodeblock();
      }
    }
  ]
});

function handleCreateTable() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
    .run();
}

function handleCreateImage() {
  if(!props.editor) return;
  const url = window.prompt('URL:');

  if(url && url != '') {
    props.editor
      .chain()
      .focus()
      .undo()
      .setImage({ src: url })
      .run();
  }
}

function handleBulletList() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .toggleBulletList()
    .run();
}

function handleNumberedList() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .toggleOrderedList()
    .run();
}

function handleCodeblock() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .setCodeBlock()
    .run();
}

function handleCreateHeading1() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .setHeading({ level: 1 })
    .run();
}

function handleCreateHeading2() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .setHeading({ level: 2 })
    .run();
}

function handleCreateHeading3() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .setHeading({ level: 3 })
    .run();
}

function handleCreateHeading4() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .setHeading({ level: 4 })
    .run();
}

function handleCreateDivider() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .setHorizontalRule()
    .run();
}
</script>

<template>
  <floating-menu
    :editor="editor"
    class="min-w-[290px] border-[1px] border-solid !rounded-[5px] pt-[30px]"
    plugin-key="commandsFloatingMenu"
    :tippy-options="{ duration: 100 }" 
    v-if="editor"
    :should-show="({ state }) => {
      const currentLine = state.doc.nodeAt(state.selection.from - 1);
      const currentLineText = currentLine?.text;
      return currentLineText === '/';
    }"
    :style="{ 
      backgroundColor: props.colors.secondary,
      borderColor: props.colors.primary + '40'
    }"
  >
    <div class="flex flex-col">
      <div class="flex flex-col gap-[10px] px-[30px]">
        <h3 class="text-[17px] text-primary font-[500]">{{ $t('markdowneditor.slashcommands-popup-title') }}</h3>
        <InputText v-model="slash.search" :placeholder="$t('markdowneditor.slashcommands-popup-search-bar-placeholder')" class="!h-[42px]"/>
        <hr class="w-full h-[1px] border-none my-[10px]" :style="{ backgroundColor: props.colors.divider }"/>
      </div>
      <ul class="flex flex-col max-h-[245px] overflow-y-auto">
        <li v-for="command in slash.search? slash.commands.filter(c => c.title.toLowerCase().match(slash.search.toLowerCase())) : slash.commands">
          <Button
            @click="command.executor()"
            :title="command.description"
            class="dinamic-button-bg flex items-center !justify-start w-full h-[80px] !rounded-[0px] border-none !px-[30px] !py-[15px]"
          >
            <div 
              class="flex justify-center items-center min-w-[50px] h-[50px] rounded-[5px]"
              :style="{ 
                backgroundColor: props.colors.primary,
                color: props.colors.text + 'c9'
              }"
            >
              <font-awesome-icon :icon="command.icon.icon" :class="command.icon.class"></font-awesome-icon>
            </div>
            <div class="relative flex flex-col items-start justify-center h-full px-[15px]">
              <h3 
                class="truncate"
                :style="{ color: props.colors.text + 'c9' }"
              >
                {{ command.title }}
              </h3>
              <p 
                class="max-w-[150px] text-[15px] truncate"
                :style="{ color: props.colors.text + '70' }"
              >
                {{ command.description }}
              </p>
            </div>
          </Button>
        </li>
        <!--Empty list message-->
        <li v-if="slash.commands.length < 1 || slash.commands.filter(c => c.title.toLowerCase().match(slash.search.toLowerCase())).length < 1">
          <div class="flex justify-center items-center w-full h-[80px]">
            <p class="text-[15px] text-primary/50">{{ $t('markdowneditor.slashcommands-popup-no-commands-found-message') }}</p>
          </div>
        </li>
      </ul>
    </div>
  </floating-menu>
</template>

<style scoped>
.dinamic-button-bg:hover {
  background-color: v-bind('colors.primary + "70"') !important;
}
</style>