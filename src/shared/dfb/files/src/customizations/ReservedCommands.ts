export function ReservedCommands() {
  return /* javascript */`
    function pulsar_open_navigation_menu() {
      // the window.parent allows the user to call the function inside of customization iframe
      // @ts-expect-error
      window.parent.openNavigationMenu();
    }
  `;
}