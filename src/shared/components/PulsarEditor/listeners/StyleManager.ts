import { EditorInstance, EditorStyles } from '../@types/Editor';

export class StyleManager {
  static create(editor: EditorInstance) {
    watch([() => editor.view.styles, () => editor.theme], ([styles, theme]) => {
      if(!styles || !editor.dom.editorStyles) return;

      let html = '';

      styles.chunks.forEach(style => {
        html += style.css(editor);
      });

      editor.dom.editorStyles.innerHTML = html;
    }, { deep: true });
  }

  static append(editor: EditorInstance, style: EditorStyles) {
    const chunks: EditorStyles[] = markRaw(editor.view.styles.chunks);
    const chunkExists = chunks.find(c => c.id === style.id);

    if(chunkExists) return;
    
    editor.view.styles.chunks = chunks.concat(style);
    editor.view.styles.time = Date.now();
  }
}