import { IDocumentation } from "~/shared/storage/models/Documentation";

export function Readme(doc: IDocumentation) {
  return `
# ${doc.title} documentation - Vite

## Running in your local machine
You can set up your documentation to test on your local machine using these commands:

\`pnpm install\` or \`npm install\` or \`yarn install\`

After running the install command, you need to execute the following command to run the application locally:

\`pnpm dev\` or \`npm run dev\` or \`yarn dev\`

## Deploy

You can deploy your documentation on any website hosting provider that supports Vite:

- Vercel
- Render
- Netlify
- Heroku
- Etc..

## Repository
Please star the Pulsar project on GitHub: 

https://github.com/FhillSlinger/pulsar
  `;
}