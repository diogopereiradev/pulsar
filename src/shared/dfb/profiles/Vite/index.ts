import { IDocumentation } from "~/shared/database/models/Documentation";
import { getIsFirstPage } from "../../utils/getIsFirstPage";
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

type HTMLPage = {
  title: string,
  html: string,
  isFirstPage: boolean
}

function getHTMLPages(doc: IDocumentation): HTMLPage[] {
  const pages = doc.pages;
  const result: HTMLPage[] = [];

  pages.forEach(page => {
    const isFirstPage = getIsFirstPage(doc, page.id);

    result.push({
      title: page.title, 
      html: Html(page, doc),
      isFirstPage
    });
  });
  return result;
}

function generatePageFiles(doc: IDocumentation, zip: JSZip) {
  const htmlPages = getHTMLPages(doc);
  htmlPages.forEach(htmlPage => {
    const fileName = htmlPage.title.toLowerCase().replaceAll(' ', '').trim();
    const pageFilePath = htmlPage.isFirstPage? 'src/index.html' : `src/${fileName}.html`;
    zip.file(pageFilePath, htmlPage.html);
  });
}

function generateAssetsFiles(doc: IDocumentation, zip: JSZip) {
  const script = Script();
  const styles = Css(doc);
  const resetStyles = ResetCss();

  zip.folder('src/assets');
  zip.file('src/assets/script.js', script);
  zip.file('src/assets/styles.css', styles);
  zip.file('src/assets/reset.css', resetStyles);
}

function generateViteConfigurationFiles(doc: IDocumentation, zip: JSZip) {
  const gitignore = ViteGitIgnore();
  const readme = Readme(doc);
  const license = License(doc);
  const manifest = Manifest(doc);
  const packagejson = VitePackageJson(doc);
  const pnpmlock = VitePnpmLock();
  const viteconfig = ViteConfig();

  zip.file('.gitignore', gitignore);
  zip.file('README.md', readme);
  zip.file('LICENSE', license);
  zip.file('package.json', packagejson);
  zip.file('manifest.json', manifest);
  zip.file('pnpm-lock.yaml', pnpmlock);
  zip.file('vite.config.js', viteconfig);
}

export async function ViteBuilder(doc: IDocumentation): Promise<Blob> {
  const zip = new JSZip();

  generatePageFiles(doc, zip);
  generateAssetsFiles(doc, zip);
  generateViteConfigurationFiles(doc, zip);
  
  return await zip.generateAsync({ type: 'blob' });
}