export function Script() {
  return /* javascript */`
    /* Navigation menu API */
    window.openNavigationMenu = () => {
      const menu = document.querySelector('.pulsar-doc-navigation-menu');
      const backdrop = document.querySelector('.pulsar-navigation-menu-mobile-backdrop');
      menu.classList.remove('pulsar-utils-hidden');
      backdrop.classList.remove('pulsar-utils-hidden');
    }

    window.closeNavigationMenu = () => {
      const menu = document.querySelector('.pulsar-doc-navigation-menu');
      const backdrop = document.querySelector('.pulsar-navigation-menu-mobile-backdrop');
      menu.classList.add('pulsar-utils-hidden');
      backdrop.classList.add('pulsar-utils-hidden');
    }

    window.addEventListener('resize', () => { // Open navigation menu if the window size is above of 1180px
      if(window.innerWidth >= 1180) {
        openNavigationMenu();
      }
    });

    // Indexes table API
    (() => {
      const indexesTableList = document.querySelector('.pulsar-indexes-table-list');
      const allIndexedHeadings = document.querySelectorAll('.pulsar-heading-indexed');
  
      allIndexedHeadings.forEach(indexedHeading => {
        const headingUniqueId = indexedHeading.textContent.toLowerCase().replaceAll(' ', '').trim() + '-' + Math.round(Math.random() * (10000 - 1) + 1);
        indexedHeading.id = headingUniqueId;
  
        const item = ${`\`
          <li>
            <a href="#\${headingUniqueId}" class="pulsar-indexes-table-list-button">
              \${indexedHeading.textContent}
            </a>
          </li>
        \``};
        indexesTableList.innerHTML += item;
      });
    })();
  `;
}