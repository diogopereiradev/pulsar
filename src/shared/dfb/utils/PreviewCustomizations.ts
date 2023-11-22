import { IDocumentation, IDocumentationCustomization } from "~/@types/declarations/Documentation";
import { ReservedCommands } from "../files/src/customizations/ReservedCommands";
import { generateDocGlobalVariables } from "./generateDocGlobalVariables";

export function PreviewCustomizations(doc: IDocumentation, customizations: IDocumentationCustomization[]) {
  return /* javascript */`
    const customizations = ${JSON.stringify(customizations)};
    const iframeResetCss = '* { padding: 0px; margin: 0px; box-sizing: border-box; scroll-behavior: smooth; }';

    const reservedCommandsScript = document.createElement('script');
    reservedCommandsScript.innerHTML = ${ReservedCommands()};

    const docColorsStyle = document.createElement('style');
    docColorsStyle.innerHTML = \"${`:root { ${generateDocGlobalVariables(doc.colors, false)} } `}\";

    customizations.forEach(async c => {
      if(c.region === 'top') {
        const topContainer = document.querySelector('#top-region-container');
        const style = document.createElement('style');
        style.innerHTML = c.content.css;
  
        const script = document.createElement('script');
        script.innerHTML = c.content.javascript;
  
        const iframe = document.createElement('iframe');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', '0');
        iframe.classList.add('topRegion');
        iframe.onload = (ev) => {
          const resetCssStyle = document.createElement('style');
          resetCssStyle.textContent = iframeResetCss;

          ev.currentTarget.contentDocument.head.appendChild(style);
          ev.currentTarget.contentDocument.head.appendChild(docColorsStyle);
          ev.currentTarget.contentDocument.head.appendChild(resetCssStyle);
          ev.currentTarget.contentDocument.body.innerHTML = c.content.html;
          ev.currentTarget.contentDocument.body.appendChild(reservedCommandsScript);
          ev.currentTarget.contentDocument.body.appendChild(script);
          ev.currentTarget.style.height = ev.currentTarget.contentWindow.document.documentElement.scrollHeight + 'px';
        };
        topContainer.appendChild(iframe);
      } 
      
      if(c.region === 'bottom') {
        const bottomContainer = document.querySelector('#bottom-region-container');
        const style = document.createElement('style');
        style.innerHTML = c.content.css;

        const script = document.createElement('script');
        script.innerHTML = c.content.javascript;

        const iframe = document.createElement('iframe');
        iframe.classList.add('bottomRegion');
        iframe.onload = (ev) => {
          const resetCssStyle = document.createElement('style');
          resetCssStyle.textContent = iframeResetCss;

          ev.currentTarget.contentDocument.head.appendChild(style);
          ev.currentTarget.contentDocument.head.appendChild(docColorsStyle);
          ev.currentTarget.contentDocument.head.appendChild(resetCssStyle);
          ev.currentTarget.contentDocument.body.innerHTML = c.content.html;
          ev.currentTarget.contentDocument.body.appendChild(reservedCommandsScript);
          ev.currentTarget.contentDocument.body.appendChild(script);
          ev.currentTarget.style.height = ev.currentTarget.contentWindow.document.documentElement.scrollHeight + 'px';
        };
        bottomContainer.appendChild(iframe);
      }
    });
  `;
}