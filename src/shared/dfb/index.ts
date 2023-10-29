import { IDocumentation } from "~/database/models/Documentation";
import { getIsFirstPage } from "./utils/getIsFirstPage";
import { Html } from "./files/src/Html";
import JSZip from "jszip";
import { Css } from "./files/src/assets/Css";
import { ResetCss } from "./files/src/assets/ResetCss";
import { Script } from "./files/src/assets/Script";
import { GitIgnore as ViteGitIgnore } from './files/GitIgnore';
import { PackageJson as VitePackageJson } from "./files/PackageJson";
import { PnpmLock as VitePnpmLock } from "./files/PnpmLock";
import { ViteConfig } from "./files/ViteConfig";
import { Readme } from "./files/Readme";
import { License } from "./files/License";
import { Manifest } from "./files/Manifest";
import { CustomizationHtml } from "./files/src/customizations/CustomizationHtml";

type HTMLPage = {
  title: string,
  html: string,
  isFirstPage: boolean
}

export class DocumentationFileBuilder {
  documentation: IDocumentation;
  zip: JSZip;

  constructor(documentation: IDocumentation) {
    this.documentation = documentation;
    this.zip = new JSZip();
  }

  getHTMLPages(): HTMLPage[] {
    const pages = this.documentation.pages;
    const result: HTMLPage[] = [];
  
    pages.forEach(page => {
      const isFirstPage = getIsFirstPage(this.documentation, page.id);
  
      result.push({
        title: page.title, 
        html: Html(page, this.documentation),
        isFirstPage
      });
    });
    return result;
  }

  generatePageFiles() {
    const htmlPages = this.getHTMLPages();
    htmlPages.forEach(htmlPage => {
      const fileName = htmlPage.title.toLowerCase().replaceAll(' ', '').trim();
      const pageFilePath = htmlPage.isFirstPage? 'src/index.html' : `src/${fileName}.html`;
      this.zip.file(pageFilePath, htmlPage.html);
    });
  }

  generateAssetsFiles() {
    const script = Script(this.documentation);
    const styles = Css(this.documentation);
    const resetStyles = ResetCss();
  
    this.zip.folder('src/assets');
    this.zip.file('src/assets/script.js', script);
    this.zip.file('src/assets/styles.css', styles);
    this.zip.file('src/assets/reset.css', resetStyles);
  }

  generateCustomizationsFiles() {
    this.zip.folder('src/customizations');
    this.documentation.customizations.forEach(c => {
      this.zip.file(`src/customizations/${c.title.toLowerCase().replaceAll(' ', '').trim()}.html`, CustomizationHtml(c));
    });
  }

  generateConfigurationFiles() {
    const gitignore = ViteGitIgnore();
    const readme = Readme(this.documentation);
    const license = License(this.documentation);
    const manifest = Manifest(this.documentation);
    const packagejson = VitePackageJson(this.documentation);
    const pnpmlock = VitePnpmLock();
    const viteconfig = ViteConfig();
  
    this.zip.file('.gitignore', gitignore);
    this.zip.file('README.md', readme);
    this.zip.file('LICENSE', license);
    this.zip.file('package.json', packagejson);
    this.zip.file('manifest.json', manifest);
    this.zip.file('pnpm-lock.yaml', pnpmlock);
    this.zip.file('vite.config.js', viteconfig);
  }

  async generate() {
    this.generatePageFiles();
    this.generateAssetsFiles();
    this.generateCustomizationsFiles();
    this.generateConfigurationFiles();
    
    return await this.zip.generateAsync({ type: 'blob' });
  }
}