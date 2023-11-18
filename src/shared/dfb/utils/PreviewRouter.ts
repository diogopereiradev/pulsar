export function PreviewRouter(docId: string, routes: { id: string, title: string }[]) {
  return /* javascript */`
    const routes = ${JSON.stringify(routes)};
    const contentContainer = document.querySelector('.pulsar-current-page-content');
    const pageLoadingContainer = document.querySelector('.pulsar-page-loading');
    const indexesTableContainer = document.querySelector('.pulsar-indexes-table-container');
    const currentRoute = new Proxy({}, {
      set: handleRouteChange
    });

    async function handleRouteChange(target, property, value) {
      if(currentRoute.route && value.id === currentRoute.route.id) return;

      contentContainer.classList.add('pulsar-utils-none');
      indexesTableContainer.classList.add('pulsar-utils-none');
      pageLoadingContainer.classList.remove('pulsar-utils-none');
      console.log(pageLoadingContainer);
      const requestContent = await fetch('/api/readStream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'page',
          docId: \'${docId}\',
          id: value.id
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

        const bufferToString = buffer.Buffer.from(r.value).toString();
        content = bufferToString;
        read();
      };
      await read();

      setTimeout(() => {
        pageLoadingContainer.classList.add('pulsar-utils-none');
        indexesTableContainer.classList.remove('pulsar-utils-none');
        contentContainer.classList.remove('pulsar-utils-none');
        contentContainer.innerHTML = content;
        window.initIndexesTable();
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