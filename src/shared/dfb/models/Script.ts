import { IDocumentation } from "~/shared/storage/models/Documentation";

export function Script(doc: IDocumentation) {
  return /* javascript */`
    function openNavigationMenu() {
      const menu = document.querySelector('.pulsar-doc-navigation-menu');
      const backdrop = document.querySelector('.pulsar-navigation-menu-mobile-backdrop');
      menu.classList.remove('pulsar-utils-hidden');
      backdrop.classList.remove('pulsar-utils-hidden');
    }

    function closeNavigationMenu() {
      const menu = document.querySelector('.pulsar-doc-navigation-menu');
      const backdrop = document.querySelector('.pulsar-navigation-menu-mobile-backdrop');
      menu.classList.add('pulsar-utils-hidden');
      backdrop.classList.add('pulsar-utils-hidden');
    }

    window.addEventListener('resize', () => {
      if(window.innerWidth >= 1180) {
        openNavigationMenu();
      }
    });
  `;
}