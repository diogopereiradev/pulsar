import { IDocumentationCustomization } from "~/database/models/Documentation";

export function CustomizationHtml(customization: IDocumentationCustomization) {
  return /* html */`
    <!DOCTYPE html>
    <html>
      <head>
        <style>${customization.content.css}</style>
      </head>
      <body>
        ${customization.content.html}
        <script>${customization.content.javascript}</script>
      </body>
    </html>
  `;
}