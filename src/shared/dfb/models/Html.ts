import { IDocumentation, IDocumentationPage } from "~/shared/storage/models/Documentation";

function NavigationMenu(page: IDocumentationPage, doc: IDocumentation): string {
  const categoryPageIsFirst = (categoryPage: IDocumentationPage) => {
    return doc.pages.filter(p => p.categoryId === doc.categories[0].id)[0].id === categoryPage.id? true : false;
  }

  return /* html */`
    <div class="pulsar-doc-navigation-menu-container">
      <div class="pulsar-doc-navigation-menu">
        <!--Mobile close menu button-->
        <button onclick="closeNavigationMenu();" class="pulsar-doc-navigation-menu-close-button">
          <i class="fa-solid fa-xmark" style="color: rgba(var(--text)); font-size: 20px;"></i>
        </button>
        <!--Map icon and title-->
        ${doc.navigationTitle && /* html */`
          <div style="display: flex; gap: 15px;">
            <div class="pulsar-doc-navigation-menu-map-icon-container">
              <i class="fa-solid fa-map" style="color: rgba(var(--primary)); font-size: 19px;"></i>
            </div>
            <div style="display: flex; flex-direction: column;">
              <p title="${doc.navigationTitle}" class="pulsar-navigation-menu-title pulsar-utils-truncate">
                ${doc.navigationTitle}
              </p>
              <p title="${doc.navigationSubTitle}" class="pulsar-navigation-menu-subtitle pulsar-utils-truncate">
                ${doc.navigationSubTitle}
              </p>
            </div>
          </div>
          <hr class="pulsar-navigation-menu-divider"/>
        `}
        <!--Categories-->
        <ul style="display: flex; flex-direction: column; gap: 15px;">
          ${doc.categories.map(category => {
            return /* html */`
              <li>
                <h2 class="pulsar-doc-navigation-menu-category-item">${category.label}</h2>
                <!--Category Pages-->
                <ul>
                  ${doc.pages.filter(p => p.categoryId === category.id).map(categoryPage => {
                    const isFirst = categoryPageIsFirst(categoryPage);
                    const routeName = categoryPage.title.toLowerCase().replaceAll(' ', '').trim();

                    return /* html */`
                      <li 
                        class="pulsar-doc-navigation-menu-category-page-item"
                        style="border-color: rgba(var(--divider), 0.725);"
                      >
                        ${doc.features.vueRouter? 
                          /* If vue router *//* html */`
                          <router-link
                            to="${isFirst? '/' : `/${routeName}`}"
                            data-page-path="${isFirst? '/' : '/' + categoryPage.title.toLowerCase().replaceAll(' ', '').trim()}"
                            title="${categoryPage.title}"
                            class="pulsar-utils-truncate"
                            style="color: rgba(var(--text), 0.4);"
                          >
                            ${categoryPage.title}
                          </router-link>
                        ` : 
                          /* No vue router *//* html */`
                          <a
                            href="#"
                            title="${categoryPage.title}"
                            class="pulsar-utils-truncate"
                            style="color: ${page.id === categoryPage.id? 'rgba(var(--primary))' : 'rgba(var(--text), 0.4)'};"
                          >
                            ${categoryPage.title}
                          </a>
                        `}
                      </li>  
                    `;
                  }).join(' ')}
                </ul>
              </li>
            `;
          }).join(' ')}
        </ul>
      </div>
      <!--Mobile navigation menu backdrop-->
      <div 
        onclick="closeNavigationMenu();" 
        class="pulsar-navigation-menu-mobile-backdrop pulsar-utils-hidden"
      ></div>
    </div>
  `;
}

export function Html(page: IDocumentationPage, doc: IDocumentation, isFirstPage: boolean) {
  const assetsRelativePath = isFirstPage? './assets' : '../assets';

  return /* html */`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name='author' content='${doc.title}' />
        <meta name='description' content='${doc.description}' />
        <meta name='robots' content='index,follow' />
        <meta name='og:title' content='${doc.title} - ${page.title}' />
        <meta name='og:description' content='${doc.description}' />
        <title>${doc.title} - ${page.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="${assetsRelativePath}/reset.css" />
        <link rel="stylesheet" href="${assetsRelativePath}/styles.css" />
        ${doc.features.vueRouter && /* html */`
        <script src="https://unpkg.com/vue@3"></script>
        <script src="https://unpkg.com/vue-router@4"></script>
        `}
        <script src="https://kit.fontawesome.com/813705bae2.js" crossorigin="anonymous"></script>
      </head>
      <body>
        <main ${doc.features.vueRouter? 'id="app"' : ''} class="pulsar-page-wrapper">
          <!--Mobile Navbar-->
          <nav class="pulsar-doc-navbar">
            <button 
              onclick="openNavigationMenu();"
              style="color: rgba(var(--text), 0.9);"
            >
              <i class="fa-solid fa-bars" style="font-size: 30px;"></i>
            </button>
          </nav>
          <hr class="pulsar-doc-navbar-divider pulsar-divider" />
          <div class="pulsar-doc-page-nav-doc-indexes-table-container">
            <!--Navigation Menu-->
            ${NavigationMenu(page, doc)}
            <!--Page Content-->
            <div class="pulsar-current-page-content">
              <router-view></router-view>
            </div>
            <!--Indexes Table-->
          </div>
        </main>
        <script src="${assetsRelativePath}/script.js"></script>
        ${doc.features.vueRouter && /* html */`
          <script src="${assetsRelativePath}/router.js"></script>
        `}
      </body>
    </html>
  `;
}