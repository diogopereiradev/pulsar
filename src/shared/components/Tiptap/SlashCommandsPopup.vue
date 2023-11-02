<script setup lang="ts">
import { Editor, FloatingMenu, CommandProps } from '@tiptap/vue-3';
import InputText from 'primevue/inputtext';
import { IDocumentationColorPalette } from '~/database/models/Documentation';

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
        class: 'text-xl'
      },
      title: t('markdowneditor.slashcommands-popup-table-title'),
      description: t('markdowneditor.slashcommands-popup-table-description'),
      executor() {
        commandExecutor(p => {
          return p.commands.insertTable({ rows: 2, cols: 2, withHeaderRow: true });
        });
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-xl'
      },
      title: t('markdowneditor.slashcommands-popup-heading-1-title'),
      description: t('markdowneditor.slashcommands-popup-heading-1-description'),
      executor() {
        commandExecutor(p => {
          return p.commands.setHeading({ level: 1 });
        });
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-xl'
      },
      title: t('markdowneditor.slashcommands-popup-heading-2-title'),
      description: t('markdowneditor.slashcommands-popup-heading-2-description'),
      executor() {
        commandExecutor(p => {
          return p.commands.setHeading({ level: 2 });
        });
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-xl'
      },
      title: t('markdowneditor.slashcommands-popup-heading-3-title'),
      description: t('markdowneditor.slashcommands-popup-heading-3-description'),
      executor() {
        commandExecutor(p => {
          return p.commands.setHeading({ level: 3 });
        });
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-heading',
        class: 'text-xl'
      },
      title: t('markdowneditor.slashcommands-popup-heading-4-title'),
      description: t('markdowneditor.slashcommands-popup-heading-4-description'),
      executor() {
        commandExecutor(p => {
          return p.commands.setHeading({ level: 4 });
        });
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-image',
        class: 'text-xl'
      },
      title: t('markdowneditor.slashcommands-popup-image-title'),
      description: t('markdowneditor.slashcommands-popup-image-description'),
      executor() {
        const url = window.prompt('URL:');

        if(url && url != '') {
          commandExecutor(p => {
            return p.commands.setImage({ src: url });
          });
        }
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-list',
        class: 'text-lg'
      },
      title: t('markdowneditor.slashcommands-popup-bulletlist-title'),
      description: t('markdowneditor.slashcommands-popup-bulletlist-description'),
      executor() {
        commandExecutor(p => {
          return p.commands.toggleBulletList();
        });
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
        commandExecutor(p => {
          return p.commands.toggleOrderedList();
        });
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
        commandExecutor(p => {
          return p.commands.setHorizontalRule();
        });
      }
    },
    {
      icon: {
        icon: 'fa-solid fa-code',
        class: 'text-lg'
      },
      title: t('markdowneditor.slashcommands-popup-codeblocks-title'),
      description: t('markdowneditor.slashcommands-popup-codeblocks-description'),
      executor() {
        commandExecutor(p => {
          return p.commands.toggleCodeBlock();
        });
      }
    }
  ]
});

function commandExecutor(command: (props: CommandProps) => boolean) {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .setTextSelection({
      from: props.editor.state.selection.from - 1,
      to: props.editor.state.selection.from
    })
    .deleteSelection()
    .command(command)
    .run();
}
</script>

<template>
  <floating-menu
    :editor="editor"
    class="min-w-[290px] border-[1px] border-solid !rounded-md pt-8"
    plugin-key="commandsFloatingMenu"
    :tippy-options="{ 
      duration: 100,
      placement: 'bottom-start'
    }" 
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
      <div class="flex flex-col gap-2.5 px-7">
        <h3 class="text-[17px] text-primary font-medium">{{ $t('markdowneditor.slashcommands-popup-title') }}</h3>
        <InputText v-model="slash.search" :placeholder="$t('markdowneditor.slashcommands-popup-search-bar-placeholder')" class="!h-11"/>
        <hr class="w-full h-px border-none my-2.5" :style="{ backgroundColor: props.colors.divider }"/>
      </div>
      <ul class="flex flex-col max-h-[245px] overflow-y-auto">
        <li v-for="command in slash.search? slash.commands.filter(c => c.title.toLowerCase().match(slash.search.toLowerCase())) : slash.commands">
          <Button
            tabindex="1"
            :aria-label="command.title"
            @click="command.executor"
            :title="command.description"
            class="dinamic-button-bg flex items-center !justify-start w-full h-20 !rounded-none border-none !px-7 !py-4"
          >
            <div 
              class="flex justify-center items-center !w-12 !h-12 rounded-md"
              :style="{ 
                backgroundColor: props.colors.primary,
                color: props.colors.text + 'c9'
              }"
            >
              <font-awesome-icon :icon="command.icon.icon" :class="command.icon.class"></font-awesome-icon>
            </div>
            <div class="relative flex flex-col items-start justify-center h-full px-4">
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
          <div class="flex justify-center items-center w-full h-20">
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