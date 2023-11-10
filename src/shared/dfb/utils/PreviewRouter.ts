export function PreviewRouter(routes: { id: number, title: string, content: string }[]) {
  return /* javascript */`
    const routes = ${JSON.stringify(routes)};
    const contentContainer = document.querySelector('.pulsar-current-page-content');
    const currentRoute = new Proxy({}, {
      set: handleRouteChange
    });

    function handleRouteChange(target, property, value) {
      contentContainer.innerHTML = value.content;
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