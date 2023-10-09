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

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;
    }

    body {
      background-color: rgb(var(--background));
      font-family: Roboto;
      font-weight: 400;
      padding: 50px;
    }

    .pulsar-utils-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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

    /* 2xl */
    @media only screen and (max-width: 1180px) {
      .pulsar-page-container {
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
    }
  `));
}