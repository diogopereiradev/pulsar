import { getServerSession } from "#auth";
import { db_client } from "~/database/client";
import chalk from "chalk";
import fs from 'fs';
import { Streaming } from "~/server/streaming";

async function deleteDoc(id: string) {
  await db_client.$connect();
  const result = await db_client.documentation.delete({
    where: {
      id
    }
  });
  await db_client.$disconnect();
  return result;
}

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const docId = (await readBody(event)).id;

  if(session && session.user && docId) {
    try {
      // Delete the documentation folder of hard disk
      const paths = Streaming.streamPaths({ docId }, session);
      fs.rmSync(paths.docPath, { recursive: true, force: true });
      
      const result = await deleteDoc(docId);
      
      if(result) {
        process.env.NODE_ENV === 'development' && 
          console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(event.path)} documentation ${chalk.yellow(docId)} ${chalk.red('[DELETED]')}`);
        return {
          status: 200
        }
      }
    } catch(err) {
      setResponseStatus(event, 500, 'Internal server error');
      return {
        status: 500,
        // @ts-expect-error
        message: err.meta.cause? err.meta.cause : err.message
      }
    }
  } else {
    setResponseStatus(event, 401, 'Unauthorized');
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }
});