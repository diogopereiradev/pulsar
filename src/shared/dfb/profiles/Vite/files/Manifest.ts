import beautify from "beautify";
import { IDocumentation } from "~/shared/storage/models/Documentation";

export function Manifest(doc: IDocumentation) {
  return beautify(JSON.stringify({
    data: doc
  }), {
    format: 'json'
  });
}