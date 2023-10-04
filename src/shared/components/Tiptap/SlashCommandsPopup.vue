<script setup lang="ts">
import { Editor, FloatingMenu } from '@tiptap/vue-3';
import { IDocumentationColorPalette } from '~/shared/storage/models/Documentation';

const props = defineProps<{
  editor: Editor | undefined,
  colors: IDocumentationColorPalette
}>();

function handleCreateTable() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
    .run();
}
</script>

<template>
  <floating-menu
    :editor="editor"
    class="border-[1px] border-solid rounded-[5px]"
    plugin-key="commandsFloatingMenu"
    :tippy-options="{ duration: 100, placement: 'bottom-start' }" 
    v-if="editor"
    :should-show="({ state }) => {
      const currentLine = state.doc.nodeAt(state.selection.from - 1);
      const currentLineText = currentLine?.text;
      return currentLineText === '/';
    }"
    :style="{ borderColor: props.colors.primary + '70' }"
  >
    <ul class="flex flex-col">
      <li>
        <Button
          @click="handleCreateTable"
          title="Crie tabelas facilmente ajustáveis"
          class="flex items-center !justify-start w-[250px] h-[80px] !rounded-t-[5px] !rounded-b-[0px] border-none !px-[15px] !py-[15px]"
          :style="{ backgroundColor: props.colors.secondary }"
        >
          <div 
            class="flex justify-center items-center min-w-[50px] h-[50px] rounded-[5px]"
            :style="{ 
              backgroundColor: props.colors.primary,
              color: props.colors.text + 'c9'
            }"
          >
            <font-awesome-icon icon="fa-solid fa-table" class="text-[20px]"></font-awesome-icon>
          </div>
          <div class="relative flex flex-col items-start justify-center h-full px-[15px]">
            <h3 
              class="truncate"
              :style="{ color: props.colors.text + 'c9' }"
            >
              Tabela
            </h3>
            <p 
              class="max-w-[150px] text-[15px] truncate"
              :style="{ color: props.colors.text + '70' }"
            >
              Crie tabelas facilmente ajustáveis
            </p>
          </div>
        </Button>
      </li>
      <li>
        <Button 
          title="Adicione imagens à página"
          class="flex items-center !justify-start w-[250px] h-[80px] !rounded-t-[0px] !rounded-b-[5px] border-none !px-[15px] !py-[15px]"
          :style="{ backgroundColor: props.colors.secondary }"
        >
          <div 
            class="flex justify-center items-center min-w-[50px] h-[50px] rounded-[5px]"
            :style="{ 
              backgroundColor: props.colors.primary,
              color: props.colors.text + 'c9'
            }"
          >
            <font-awesome-icon icon="fa-solid fa-image" class="text-[20px]"></font-awesome-icon>
          </div>
          <div class="relative flex flex-col items-start justify-center h-full px-[15px]">
            <h3 
              class="truncate"
              :style="{ color: props.colors.text + 'c9' }"
            >
              Imagem
            </h3>
            <p 
              class="max-w-[150px] text-[15px] truncate"
              :style="{ color: props.colors.text + '70' }"
            >
              Adicione imagens à página
            </p>
          </div>
        </Button>
      </li>
    </ul>
  </floating-menu>
</template>