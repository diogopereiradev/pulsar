export function cursorToEnd() {
  const sel = window.getSelection();
  const range = document.createRange();

  range.setStart(sel!.anchorNode!, sel!.anchorNode!.childNodes.length);
  range.collapse(true);

  sel?.removeAllRanges();
  sel?.addRange(range);
}