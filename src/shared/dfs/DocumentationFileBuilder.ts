import JSZip from "jszip";
import { Html } from './models/Html';
import { Css } from './models/Css';
import { IDocumentation } from "../storage/models/Documentation";

type StringifiedHTMLPage = {
  title: string,
  html: string
}

export class DocumentationFileBuilder {
  private zip: JSZip;
  private documentation: IDocumentation

  constructor(documentation: IDocumentation) {
    this.zip = new JSZip();
    this.documentation = documentation;
  }

  private getStringifiedHTMLPages(): StringifiedHTMLPage[] {
    const pages = this.documentation.pages;
    const result: StringifiedHTMLPage[] = [];

    pages.forEach(page => {
      result.push({
        title: page.title, 
        html: Html(page, this.documentation)
      });
    });
    return result;
  }

  async generate(): Promise<Blob> {
    this.getStringifiedHTMLPages().forEach(htmlPage => {
      const fileName = htmlPage.title.toLowerCase().replaceAll(' ', '').trim();
      this.zip.file(`${fileName}.html`, htmlPage.html);
    });

    this.zip.folder('assets');
    this.zip.file('assets/styles.css', Css(this.documentation));

    const result = await this.zip.generateAsync({ type: 'blob' });
    return result;
  }
}