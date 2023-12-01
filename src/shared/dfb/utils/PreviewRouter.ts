import { IDocumentation } from "~/@types/declarations/Documentation";

export function PreviewRouter(doc: IDocumentation, routes: { id: string, title: string }[]) {
  return /* javascript */`
    const routes = ${JSON.stringify(routes)};
    const contentContainer = document.querySelector('.pulsar-current-page-content');
    const pageLoadingContainer = document.querySelector('.pulsar-page-loading');
    const indexesTableContainer = document.querySelector('.pulsar-indexes-table-container');
    const currentRoute = new Proxy({}, {
      set: handleRouteChange
    });
    const cachedPages = [];

    async function handleRouteChange(target, property, value) {
      if(currentRoute.route && value.id === currentRoute.route.id) return;
      const cachedPage = cachedPages.find(page => page.id === value.id);

      contentContainer.classList.add('pulsar-utils-none');
      indexesTableContainer.classList.add('pulsar-utils-none');
      pageLoadingContainer.classList.remove('pulsar-utils-none');

      if(cachedPage) {
        setTimeout(() => {
          contentContainer.innerHTML = cachedPage.content;
          window.initIndexesTable();
          pageLoadingContainer.classList.add('pulsar-utils-none');
          indexesTableContainer.classList.remove('pulsar-utils-none');
          contentContainer.classList.remove('pulsar-utils-none');
        }, 300);
        return target[property] = value;
      }

      const requestContent = await fetch('/api/readStream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'page',
          docId: \'${doc.id}\',
          id: value.id,
          authorIdentifier: \'${doc.authorIdentifier}\'
        })
      });
    
      const reader = requestContent.body?.getReader();
      let content = '';
    
      const read = async () => {
        const r = await reader.read();
    
        if(r.done) {
          reader?.releaseLock();
          return;
        }

        const decoder = new TextDecoder('utf-8');
        const bufferToString = decoder.decode(r.value);
        content = bufferToString;
        read();
      };
      await read();

      setTimeout(() => {
        contentContainer.innerHTML = content;
        window.initIndexesTable();
        pageLoadingContainer.classList.add('pulsar-utils-none');
        indexesTableContainer.classList.remove('pulsar-utils-none');
        contentContainer.classList.remove('pulsar-utils-none');

        // Add page to the cached page
        cachedPages.push({
          ...value,
          content
        });
      }, 300);
      return target[property] = value;
    }

    window.changeRoute = (ev, id) => {
      if(ev) {
        const currentPageButton = document.querySelector('.current-page');
        if(currentPageButton) currentPageButton.classList.remove('current-page');
        ev.classList.add('current-page');
      }
      const page = routes.find(route => route.id === id);
      currentRoute.route = page;
    }

    // Open the first page
    (() => {
      currentRoute.route = routes[0];
    })();
  `;
}