import beautify from 'js-beautify';

export function Script() {
  return beautify.js(/* javascript */`
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

    // Lock the menu position when reach the scroll limit
    window.addEventListener('scroll', ev => {
      const container = document.querySelector('.pulsar-doc-navigation-menu-container');
      const navigationMenu = document.querySelector('.pulsar-doc-navigation-menu');
      const navigationMenuLinksList = document.querySelector('.pulsar-doc-navigation-menu-category-list');

      if(navigationMenu) {
        const currentPercentage = (window.scrollY / container.scrollHeight) * 100;
        
        if(currentPercentage >= 74 && window.innerWidth >= 1181) {
          navigationMenu.style.position = 'absolute';
          navigationMenu.style.bottom = '20px';
          navigationMenu.style.maxHeight = 'auto';
          navigationMenuLinksList.style.overflowY = 'visible';
        } else {
          navigationMenu.style.position = 'fixed';
          navigationMenu.style.bottom = 'auto';
          navigationMenu.style.maxHeight = '100vh';
          navigationMenuLinksList.style.overflowY = 'scroll';
        }
      }
    });

    // Lock the table position when reach the scroll limit
    window.addEventListener('scroll', ev => {
      const container = document.querySelector('.pulsar-indexes-table-container');
      const table = document.querySelector('.pulsar-indexes-table');

      if(container) {
        const currentPercentage = (window.scrollY / container.scrollHeight) * 100;
        
        if(currentPercentage >= 83) {
          table.style.position = 'absolute';
          table.style.bottom = '80px';
        } else {
          table.style.position = 'fixed';
          table.style.bottom = 'auto';
        }
      }
    });

    // Indexes table loader
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
  `, {
    indent_size: 2
  });
}