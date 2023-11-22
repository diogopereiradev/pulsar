import css from 'css';
// @ts-ignore
import hexToRgb from 'hex-to-rgb';
import { IDocumentation, IDocumentationColorPalette } from "~/@types/declarations/Documentation";

function generateGlobalVariables(colors: IDocumentationColorPalette): string {
  const colorNames = Object.keys(colors);
  const colorValues = Object.values(colors);

  return colorNames.reduce((acc, colorName, i) => {
    return `${acc}\n--${colorName}: ${hexToRgb(colorValues[i])};`;
  }, '');
}

export function Css(doc: IDocumentation) {
  return css.stringify(css.parse(/* css */`
    /* Colors are in RGB, as it is easy to control the alpha color */
    :root {
      ${generateGlobalVariables(doc.colors)}
    }

    * {
      scroll-behavior: smooth;
      scrollbar-color: ${doc.colors.scrollbar} transparent;
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 4px;
      border-radius: 10px;
      background-color: transparent;
      cursor: pointer;
    }
  
    ::-webkit-scrollbar-thumb {
      background-color: ${doc.colors.scrollbar};
    }

    .pulsar-page-wrapper {
      max-width: 2120px;
      margin: 0 auto;
      padding: ${doc.customizations.find(c => c.region === 'top')? '0px' : '70px'} 50px 50px 50px;
    }

    .pulsar-utils-none {
      display: none !important;
    }

    body {
      background-color: rgb(var(--background));
      font-family: Roboto;
      font-weight: 400;
    }

    .top-region-container {
      width: 100%;
    }

    .topRegion {
      width: 100%;
    }

    .bottomRegion {
      width: 100%;
    }

    .pulsar-page-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 76vh;
      color: ${doc.colors.primary}b8;
      font-size: 40px;
    }

    .pulsar-utils-hidden {
      opacity: 0;
      pointer-events: none;
    }

    .pulsar-utils-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pulsar-current-page-content {
      width: 100%;
      word-break: break-word;
      overflow-x: hidden;
    }
  
    .pulsar-doc-navbar {
      display: none;
      align-items: center;
      width: 100%;
      padding-bottom: 25px;
    }
  
    .pulsar-doc-navbar-divider {
      display: none;
      margin-bottom: 50px;
    }
  
    .pulsar-doc-page-nav-doc-indexes-table-container {
      display: flex;
      gap: 60px;
    }

    .pulsar-heading {
      font-weight: 500;
      color: rgb(var(--text));
    }
  
    .pulsar-heading-1 {
      font-size: 35px;
    }
  
    .pulsar-heading-2 {
      font-size: 30px;
    }
  
    .pulsar-heading-3 {
      font-size: 25px;
    }
  
    .pulsar-heading-4 {
      font-size: 22px;
    }
  
    .pulsar-paragraph {
      font-size: 16px;
      font-weight: 400;
      color: rgba(var(--text), 0.725);
    }

    .pulsar-paragraph:empty {
      position: relative;
      min-width: 30px;
      min-height: 24px;
    }
  
    .pulsar-divider {
      width: 100%;
      height: 1px;
      border: none;
      background-color: rgb(var(--divider));
    }

    .pulsar-link {
      font-size: 16px;
      font-weight: 400;
      color: rgb(var(--primary));
    }
  
    .pulsar-bulletlist {
      padding: 0 1rem;
      list-style: disc;
      color: rgb(var(--text));
    }

    .pulsar-numberedlist {
      padding: 0 1rem;
      list-style: decimal;
      color: rgba(var(--text)) !important;
    }

    .tableWrapper {
      padding: 1rem 0;
      overflow-x: auto;
    }

    .tableWrapper table {
      width: auto;
      border-collapse: collapse;
      table-layout: fixed;
      margin: 0;
      overflow-x: scroll;
      word-break: initial;
    }
    
    .tableWrapper table td, th {
      min-width: 1em;
      border: 2px solid rgb(var(--secondary));
      padding: 6px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;
    }
  
    .tableWrapper table th {
      font-weight: bold;
      text-align: left;
      background-color: rgb(var(--secondary));
    }
    
    .highlighted-codeblock {
      width: 100%;
      background-color: rgb(var(--secondary));
      color: rgb(var(--codeBlockText));
      font-family: Roboto;
      font-weight: 400;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      overflow-x: scroll;
      white-space: pre !important;
    }

    .highlighted-codeblock code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 16px;
      white-space: pre;
    }

    .hljs-comment, .hljs-quote { color: rgb(var(--codeBlockComments)); }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: rgb(var(--codeBlockVariable));
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: rgb(var(--codeBlockLiteral));
    }

    .hljs-string, .hljs-symbol, .hljs-bullet { color: rgb(var(--codeBlockString)); }

    .hljs-title, .hljs-section { color: rgb(var(--codeBlockSection)); }

    .hljs-keyword, .hljs-selector-tag { color: rgb(var(--codeBlockKeyword)); }

    .hljs-emphasis { font-style: italic; }

    .hljs-strong { font-weight: 700; }

    .pulsar-doc-navigation-menu-container {
      display: flex;
      justify-content: right;
      min-width: 250px;
    }
    
    .pulsar-doc-navigation-menu {
      display: flex;
      position: sticky;
      top: 50px;
      flex-direction: column;
      max-width: 240px;
      max-height: 100vh;
      width: 100%;
      background-color: transparent;
      transition: .3s;
      z-index: 100;
    }

    .pulsar-doc-navigation-menu-map-icon {
      fill: rgba(var(--primary));
      font-size: 19px;
    }

    .pulsar-navigation-menu-divider {
      width: 100%;
      height: 2px;
      border: none;
      background-color: rgba(var(--divider), 0.5);
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .pulsar-doc-navigation-menu-category-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
      overflow-y: auto;
      max-height: 79vh;
      padding-bottom: 30px;
      scrollbar-width: thin;
    }
    
    .pulsar-doc-navigation-menu-category-list::-webkit-scrollbar {
      width: 2px;
    }
    
    .pulsar-doc-navigation-menu-category-list::-webkit-scrollbar-thumb {
      background-color: rgba(var(--text), 0.31);
    }
    
    .pulsar-navigation-menu-mobile-backdrop {
      display: none;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100vw;
      height: 100vh;
      background-color: #00000050;
      transition: .3s;
      z-index: 99;
    } 
    
    .pulsar-doc-navigation-menu-close-button {
      display: none;
      position: absolute;
      right: 30px;
      top: 30px;
    } 
    
    .pulsar-doc-navigation-menu-map-icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 48px;
      height: 48px;
      background-color: rgba(var(--primary), 0.3);
      border-radius: 10px;
    }

    .pulsar-navigation-menu-title {
      color: rgba(var(--text), 0.8);
      max-width: 150px;
      font-size: 17px;
    }

    .pulsar-navigation-menu-subtitle {
      color: rgba(var(--text), 0.6);
      max-width: 150px;
      font-size: 15px;
      margin-top: -4px;
    }

    .pulsar-doc-navigation-menu-category-item {
      color: rgba(var(--text));
      font-weight: 500;
      font-size: 15px;
    }
    
    .pulsar-doc-navigation-menu-category-page-item:first-child {
      margin-top: 5px;
    } 
    
    .pulsar-doc-navigation-menu-category-page-item .pulsar-navigation-link {
      display: flex;
      align-items: center;
      max-width: 160px;
      border-left: 2px solid rgba(var(--divider), 0.725);
      color: rgba(var(--text), 0.4);
      padding-left: 20px;
      margin-left: 1px;
      height: 36px;
      font-weight: 400;
      transition: .3s;
    }
    
    .pulsar-doc-navigation-menu-category-page-item .current-page {
      color: rgba(var(--primary)) !important;
      border-left: 2px solid rgba(var(--primary)) !important;
    }
    
    .pulsar-doc-navigation-menu-category-page-item a:hover {
      color: rgba(var(--primary), 0.725) !important;
      border-left: 2px solid rgba(var(--primary), 0.725) !important;
    }

    .pulsar-indexes-table-container {
      ${doc.features.indexesTable? '' : 'display: none;'}
      position: relative;
      min-width: 180px;
    }
  
    .pulsar-indexes-table {
      position: sticky;
      top: 50px;
      overflow-y: auto;
      max-width: 230px;
      height: 50vh;
      scrollbar-width: thin;
      margin-left: 20px;
      padding-bottom: 100px;
    }

    .pulsar-indexes-table::-webkit-scrollbar {
      width: 2px;
    }
    
    .pulsar-indexes-table::-webkit-scrollbar-thumb {
      background-color: rgba(var(--text), 0.6);
    }
  
    .pulsar-indexes-table-title {
      color: rgba(var(--text), 0.91);
      font-weight: 500;
      font-size: 15px;
    }
  
    .pulsar-indexes-table-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }
  
    .pulsar-indexes-table-list-button {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 230px;
      color: rgba(var(--text), 0.63);
      font-size: 15px;
    }
  
    @media only screen and (max-width: 768px) {
      .pulsar-indexes-table-container {
        display: none;
      }
    }

    /* 2xl */
    @media only screen and (max-width: 1180px) {
      .pulsar-page-wrapper {
        flex-direction: column;
      }
  
      .pulsar-doc-navbar {
        display: flex;
      }
  
      .pulsar-doc-navbar-divider {
        display: block;
      }
  
      .pulsar-doc-page-nav-doc-indexes-table-container {
        gap: 0px;
      }

      .pulsar-doc-navigation-menu-container {
        position: relative;
        min-width: 0px;
      }
    
      .pulsar-doc-navigation-menu {
        min-width: 220px;
        max-width: 320px;
        min-height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(var(--secondary));
        padding: 50px 40px;
        overflow-y: scroll;
      }
    
      .pulsar-navigation-menu-mobile-backdrop {
        display: block;
      }
    
      .pulsar-doc-navigation-menu-close-button {
        display: block;
      }

      .pulsar-indexes-table {
        margin-left: 40px;
      }
    }
  `));
}