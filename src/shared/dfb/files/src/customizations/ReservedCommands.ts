export function ReservedCommands() {
  return /* javascript */`
    function pulsar_openNavigation() {
      // the window.parent allows the user to call the function inside of customization iframe
      // @ts-expect-error
      window.parent.openNavigationMenu();
    }
  `;
}