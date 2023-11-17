export function PreviewRouter(docId: string, routes: { id: string, title: string }[]) {
  return /* javascript */`
    const routes = ${JSON.stringify(routes)};
    const contentContainer = document.querySelector('.pulsar-current-page-content');
    const currentRoute = new Proxy({}, {
      set: handleRouteChange
    });

    async function handleRouteChange(target, property, value) {
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

      contentContainer.innerHTML = content;
      window.initIndexesTable();
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