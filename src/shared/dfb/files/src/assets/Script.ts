import beautify from 'js-beautify';
import { IDocumentation } from '~/database/models/Documentation';

export function Script(doc: IDocumentation) {
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

    // Customizations
    window.loadCustomizations = () => {
      const topRegion = document.querySelector('#topRegion');
      const bottomRegion = document.querySelector('#bottomRegion');

      ${doc.customizations.map(c => /* javascript */`
        if(\'${c.region}\' === 'top') {
          const elem${c.id} = document.createElement('div');
          elem${c.id}.innerHTML = \`${c.content.html}\`;
          topRegion.appendChild(elem${c.id});
        }

        if(\'${c.region}\' === 'bottom') {
          const elem${c.id} = document.createElement('div');
          elem${c.id}.innerHTML = \`${c.content.html}\`;
          bottomRegion.appendChild(elem${c.id});
        }

        (() => {
          const style = document.createElement('style');
          style.innerHTML = \`${c.content.css}\`;
          document.head.appendChild(style);

          const script = document.createElement('script');
          script.innerHTML = \`${c.content.javascript}\`;
          document.body.appendChild(script);
        })();
      `).join('')}
    };

    // Indexes table loader
    window.initIndexesTable = () => {
      const indexesTableList = document.querySelector('.pulsar-indexes-table-list');
      const allIndexedHeadings = document.querySelectorAll('.pulsar-heading-indexed');
      const headings = [];

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
        headings.push(item);
      });
      indexesTableList.innerHTML = headings.join('');
    }

    (() => {
      window.initIndexesTable();
      window.loadCustomizations();
    })();
  `, {
    indent_size: 2
  });
}