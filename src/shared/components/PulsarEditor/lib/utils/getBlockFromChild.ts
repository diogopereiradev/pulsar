export function getBlockFromChild(child: HTMLElement | undefined): HTMLElement | undefined {
  if(!child) return undefined;
  if(child.classList.contains('pulsar-editor-block')) return child;
  
  if(child.classList.contains('pulsar-editor-blocks')) {
    return undefined;
  } else {
    const block = getBlockFromChild(child.parentElement!);
    return block;
  }
}