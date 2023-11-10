import { IDocumentationCustomization } from "~/@types/declarations/Documentation";

export function PreviewCustomizations(customizations: IDocumentationCustomization[]) {
  return /* javascript */`
    const customizations = ${JSON.stringify(customizations)};
  
    customizations.forEach(c => {
      if(c.region === 'top') {
        const topContainer = document.querySelector('#top-region-container');
        const style = document.createElement('style');
        style.innerHTML = c.content.css;
  
        const script = document.createElement('script');
        script.innerHTML = c.content.javascript;
  
        const iframe = document.createElement('iframe');
        iframe.classList.add('topRegion');
        iframe.onload = (ev) => {
          ev.currentTarget.contentDocument.head.appendChild(style);
          ev.currentTarget.contentDocument.body.innerHTML = c.content.html;
          ev.currentTarget.contentDocument.body.appendChild(script);
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
          ev.currentTarget.contentDocument.head.appendChild(style);
          ev.currentTarget.contentDocument.body.innerHTML = c.content.html;
          ev.currentTarget.contentDocument.body.appendChild(script);
        };
        bottomContainer.appendChild(iframe);
      }
    });
  `;
}