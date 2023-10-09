import JSZip from "jszip";
import { Html } from './models/Html';
import { Css } from './models/Css';
import { IDocumentation } from "../storage/models/Documentation";
import { ResetCss } from "./models/ResetCss";

type StringifiedHTMLPage = {
  title: string,
  html: string,
  isFirstPage: boolean
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
      const isFirstPage = pages.filter(p => p.categoryId === this.documentation.categories[0].id)[0].id === page.id? true : false;

      result.push({
        title: page.title, 
        html: Html(page, this.documentation, isFirstPage),
        isFirstPage
      });
    });
    return result;
  }

  async generate(): Promise<Blob> {
    this.getStringifiedHTMLPages().forEach(htmlPage => {
      const fileName = htmlPage.title.toLowerCase().replaceAll(' ', '').trim();
      const pageFilePath = htmlPage.isFirstPage? 'index.html' : `pages/${fileName}.html`;
      this.zip.file(pageFilePath, htmlPage.html);
    });

    this.zip.folder('assets');
    this.zip.file('assets/reset.css', ResetCss());
    this.zip.file('assets/styles.css', Css(this.documentation));

    const result = await this.zip.generateAsync({ type: 'blob' });
    return result;
  }
}