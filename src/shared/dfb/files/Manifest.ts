import beautify from "beautify";
import { IDocumentation } from "~/database/models/Documentation";

export function Manifest(doc: IDocumentation) {
  return beautify(JSON.stringify({
    data: doc
  }), {
    format: 'json'
  });
}