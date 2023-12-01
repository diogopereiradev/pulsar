import beautify from 'beautify';
import { IDocumentation } from '~/@types/declarations/Documentation'; 

export function PackageJson(doc: IDocumentation) {
  return beautify(`
    {
      "name": "${doc.title.toLowerCase().replaceAll(' ', '-').trim()}",
      "version": "1.0.0",
      "description": "${doc.description}",
      "author": "${doc.title.toLowerCase().replaceAll(' ', '-').trim()}",
      "license": "MIT",
      "type": "module",
      "private": true,
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
      },
      "devDependencies": {
        "glob": "^10.3.10",
        "vite": "^4.4.5"
      }
    }
  `, {
    format: 'json'
  });
}