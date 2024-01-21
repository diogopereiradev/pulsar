export function plainTextPaste(ev: ClipboardEvent) {
  const text = ev.clipboardData!.getData('text/plain')

  if (document.queryCommandSupported('insertText')) {
    document.execCommand('insertText', false, text);
  } else {
    const range = document.getSelection()!.getRangeAt(0);
    range.deleteContents();
  
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.selectNodeContents(textNode);
    range.collapse(false);
  
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}