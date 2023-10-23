import beautify from "js-beautify";
import { getIsFirstPage } from "~/shared/dfb/utils/getIsFirstPage";
import { IDocumentation, IDocumentationPage } from "~/database/models/Documentation";
import { MapIcon } from "./assets/icons/MapIcon";
import { Css } from "./assets/Css";
import { ResetCss } from "./assets/ResetCss";

function NavigationMenu(page: IDocumentationPage, doc: IDocumentation, isToPreview: boolean) {
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
              ${MapIcon('pulsar-doc-navigation-menu-map-icon')}
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
        <ul class="pulsar-doc-navigation-menu-category-list">
          ${doc.categories.map(category => {
            return /* html */`
              <li>
                <h2 class="pulsar-doc-navigation-menu-category-item">${category.label}</h2>
                <!--Category Pages-->
                <ul>
                  ${doc.pages.filter(p => p.categoryId === category.id).map(categoryPage => {
                    const isFirst = getIsFirstPage(doc, categoryPage.id);
                    const routeName = categoryPage.title.toLowerCase().replaceAll(' ', '').trim();

                    return /* html */`
                      <li 
                        class="pulsar-doc-navigation-menu-category-page-item"
                        style="border-color: rgba(var(--divider), 0.725);"
                      >
                        ${isToPreview? /* html */`
                          <button
                            onclick="changeRoute(this, ${JSON.stringify(categoryPage).replaceAll('"', '\'')})"
                            title="${categoryPage.title}"
                            data-id="${categoryPage.id}"
                            class="pulsar-navigation-link pulsar-utils-truncate ${routeName === page.title.toLowerCase().replaceAll(' ', '').trim() && 'current-page'}"
                          >
                            ${categoryPage.title}
                          </button>
                        ` : /* html */`
                          <a
                            href="${isFirst? '/' : '/' + routeName + '.html'}"
                            title="${categoryPage.title}"
                            class="pulsar-navigation-link pulsar-utils-truncate ${page.title.toLowerCase().replaceAll(' ', '').trim() === routeName? 'current-page' : ''}"
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

function IndexesTable(page: IDocumentationPage, doc: IDocumentation) {
  return /* html */`
    <div class="pulsar-indexes-table-container">
      ${doc.features.indexesTable? /* html */`
        <div class="pulsar-indexes-table" >
          <h2 class="pulsar-indexes-table-title">
            ${doc.indexesTableTitle}
          </h2>
          <ul class="pulsar-indexes-table-list"></ul>
        </div>
      ` : ''}
    </div>
  `;
}

function Content(page: IDocumentationPage, doc: IDocumentation, isToPreview: boolean) {
  return /* html */`
    <div class="pulsar-doc-page-nav-doc-indexes-table-container">
      <!--Navigation Menu-->
      ${NavigationMenu(page, doc, isToPreview)}
      <!--Page Content-->
      ${isToPreview? /* html */`
        <div class="pulsar-current-page-content"></div>
      ` : /* html */`
        <div class="pulsar-current-page-content">
          ${page.content}
        </div>
      `}
      <!--Indexes Table-->
      ${IndexesTable(page, doc)}
    </div>
  `;
}

function BasicHeadTags(page: IDocumentationPage, doc: IDocumentation, isToPreview: boolean) {
  return /* html */`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name='author' content='${doc.title}' />
    <meta name='description' content='${doc.description}' />
    <meta name='robots' content='index,follow' />
    <meta name='og:title' content='${doc.title} - ${page.title}' />
    <meta name='og:description' content='${doc.description}' />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
    ${isToPreview? /* html */`
      <style>${ResetCss()}</style>
      <style>${Css(doc)}</style>
    ` : 
    /* html */`
      <script src="https://kit.fontawesome.com/813705bae2.js" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="./assets/reset.css" />
      <link rel="stylesheet" href="./assets/styles.css" />
    `}
  `;
}

export function Html(page: IDocumentationPage, doc: IDocumentation, options = { isToPreview: false }) {
  return beautify.html(/* html */`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${doc.title} - ${page.title}</title>
        ${BasicHeadTags(page, doc, options.isToPreview)}
      </head>
      <body>
        <main id="app" class="pulsar-page-wrapper">
          <!--Default mobile Navbar-->
          ${doc.customizations.filter(c => c.region === 'top').length > 0? '' : /* html */`
            <nav class="pulsar-doc-navbar">
              <button 
                onclick="openNavigationMenu();"
                style="color: rgba(var(--text), 0.9);"
              >
                <i class="fa-solid fa-bars" style="font-size: 30px;"></i>
              </button>
            </nav>
            <hr class="pulsar-doc-navbar-divider pulsar-divider" />
          `}
          ${Content(page, doc, options.isToPreview)}
        </main>
        ${options.isToPreview? '' : /* html */`<script type="module" src="./assets/script.js"></script>`}
      </body>
    </html>
  `, {
    indent_size: 2
  });
}