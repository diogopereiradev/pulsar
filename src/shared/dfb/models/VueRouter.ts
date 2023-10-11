import { IDocumentation, IDocumentationPage } from "~/shared/storage/models/Documentation";

export function VueRouter(doc: IDocumentation) {
  const pageIsFirst = (page: IDocumentationPage) => {
    return doc.pages.filter(p => p.categoryId === doc.categories[0].id)[0].id === page.id? true : false;
  }

  return /* javascript */`
    const routes = [
      ${doc.pages.map(page => {
        return `{ 
          path: "${pageIsFirst(page)? '/' : '/' + page.title.replaceAll(' ', '').toLowerCase().trim()}", 
          component: { template: \`${page.content}\` }
        }`;
      }).join(', ')}
    ];

    const router = VueRouter.createRouter({
      history: VueRouter.createWebHashHistory(),
      routes
    });
    
    const app = Vue.createApp({});
    app.use(router);
    app.mount('#app');
  `;
}