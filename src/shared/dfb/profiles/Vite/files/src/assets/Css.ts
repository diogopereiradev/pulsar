import css from 'css';
// @ts-ignore
import hexToRgb from 'hex-to-rgb';
import { IDocumentation, IDocumentationColorPalette } from "~/shared/storage/models/Documentation";

function generateGlobalVariables(colors: IDocumentationColorPalette): string {
  const colorNames = Object.keys(colors);
  const colorValues = Object.values(colors);

  return colorNames.reduce((acc, colorName, i) => {
    return `${acc}\n--${colorName}: ${hexToRgb(colorValues[i])};`;
  }, '');
}

export function Css(doc: IDocumentation) {
  return css.stringify(css.parse(`
    /* Colors are in RGB, as it is easy to control the alpha color */
    :root {
      ${generateGlobalVariables(doc.colors)}
    }

    .pulsar-page-wrapper {
      max-width: 2120px;
      margin: 0 auto;
    }

    body {
      background-color: rgb(var(--background));
      font-family: Roboto;
      font-weight: 400;
      padding: 50px;
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

    .pulsar-paragraph:empty:after {
      content: '\xA0'
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
  
    .pulsar-table {
      width: auto;
      border-collapse: collapse;
      table-layout: fixed;
      margin: 0;
      overflow: hidden;
    }
    
    .pulsar-table td, th {
      min-width: 1em;
      border: 2px solid rgb(var(--secondary));
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;
    }
  
    .pulsar-table th {
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
      width: 340px;
    }
    
    .pulsar-doc-navigation-menu {
      display: flex;
      position: fixed;
      flex-direction: column;
      max-width: 240px;
      width: 100%;
      background-color: transparent;
      transition: .3s;
      z-index: 100;
    }

    .pulsar-navigation-menu-divider {
      width: 100%;
      height: 2px;
      border: none;
      background-color: rgba(var(--divider), 0.5);
      margin-top: 20px;
      margin-bottom: 20px;
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
      min-width: 45px;
      height: 45px;
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
    
    .pulsar-doc-navigation-menu-category-page-item a {
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
        width: 0px;
      }
    
      .pulsar-doc-navigation-menu {
        min-width: 220px;
        max-width: 320px;
        height: 100vh;
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
    }
  `));
}