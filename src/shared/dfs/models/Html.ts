import { IDocumentation, IDocumentationPage } from "~/shared/storage/models/Documentation";

export function Html(page: IDocumentationPage, doc: IDocumentation) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${doc.title} - ${page.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="./assets/styles.css" />
      </head>
      <body>
        ${page.content}
      </body>
    </html>
  `;
}