import beautify from 'beautify';
import { IDocumentation } from '~/@types/declarations/Documentation'; 

export function Manifest(doc: IDocumentation) {
  return beautify(JSON.stringify({
    data: doc
  }), {
    format: 'json'
  });
}