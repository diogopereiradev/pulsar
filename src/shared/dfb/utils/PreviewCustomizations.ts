import { IDocumentationCustomization } from "~/@types/declarations/Documentation";

export function PreviewCustomizations(customizations: IDocumentationCustomization[]) {
  return /* javascript */`
    const customizations = ${JSON.stringify(customizations)};
    const iframeResetCss = '* { padding: 0px; margin: 0px; box-sizing: border-box; scroll-behavior: smooth; }'

    customizations.forEach(c => {
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
          ev.currentTarget.contentDocument.head.appendChild(resetCssStyle);
          ev.currentTarget.contentDocument.body.innerHTML = c.content.html;
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
          ev.currentTarget.contentDocument.head.appendChild(resetCssStyle);
          ev.currentTarget.contentDocument.body.innerHTML = c.content.html;
          ev.currentTarget.contentDocument.body.appendChild(script);
          ev.currentTarget.style.height = ev.currentTarget.contentWindow.document.documentElement.scrollHeight + 'px';
        };
        bottomContainer.appendChild(iframe);
      }
    });
  `;
}