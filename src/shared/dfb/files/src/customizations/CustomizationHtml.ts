import { Buffer } from "buffer";
import { IDocumentation, IDocumentationCustomization } from "~/@types/declarations/Documentation";

export async function CustomizationHtml(doc: IDocumentation, customization: IDocumentationCustomization) {
  const content = ref<{ html?: string, css?: string, javascript?: string }>();

  const result = await fetch('/api/readStream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'customization',
      docId: doc.id,
      id: customization.id,
      authorIdentifier: doc.authorIdentifier
    })
  });

  if(result.status === 200) {
    const reader = result.body?.getReader();

    const read = async () => {
      const { done, value } = await reader!.read();

      if(done) {
        reader?.releaseLock();
        return;
      }

      const bufferToString = JSON.parse(Buffer.from(value).toString());
      content.value = bufferToString;
      read();
    };
    await read();
  }

  return /* html */`
    <!DOCTYPE html>
    <html>
      <head>
        <style>${content.value?.css}</style>
      </head>
      <body>
        ${content.value?.html}
        <script>${content.value?.javascript}</script>
      </body>
    </html>
  `;
}