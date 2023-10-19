import { IDocumentation } from "~/database/models/Documentation";
import { ViteBuilder } from "./profiles/Vite";

type Profiles = 'vite';

export class DocumentationFileBuilder {
  private documentation: IDocumentation

  constructor(documentation: IDocumentation) {
    this.documentation = documentation;
  }

  async generate(profile: Profiles): Promise<Blob | undefined> {
    switch (profile) {
      case 'vite':
        return await ViteBuilder(this.documentation);
      default:
        return undefined;
    }
  }
}