import { IDocumentation } from "~/@types/declarations/Documentation";

export function ReservedCommands(doc: IDocumentation, isToPreview = false) {
  return /* javascript */`
    function pulsar_openNavigation() {
      // the window.parent allows the user to call the function inside of customization iframe
      window.parent.openNavigationMenu();
    }

    function pulsar_navigateTo(index) {
      const routes = ${JSON.stringify(doc.pages)};
      const route = routes[index];
      
      ${isToPreview? /* javascript */`
        const currentPageButton = window.parent.document.querySelector('.current-page');
        const newPageButton = window.parent.document.querySelector('[data-id="' + route.id + '"]');
  
        if(currentPageButton) currentPageButton.classList.remove('current-page');
        newPageButton.classList.add('current-page');
  
        window.parent.changeRoute(newPageButton, route.id);
      `: /* javascript */`
        window.parent.location.href = '/' + route.title.toLowerCase().replaceAll(' ', '').trim() + '.html';
      `}
    }
  `;
}