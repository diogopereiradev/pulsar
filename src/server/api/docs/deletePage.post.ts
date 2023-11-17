import { getServerSession } from "#auth";
import chalk from "chalk";
import { ErrorMessages } from "~/server/errors";
import { Streaming } from "~/server/streaming";
import { ReadStreamBody } from "~/server/streaming/@types/ReadStreamBody";

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const body = await readBody(event);

  if(session && session.user && body) {
    const data = body as ReadStreamBody;
    const result = Streaming.streamingDeleteFiles({
      type: data.type,
      docId: data.docId,
      id: data.id
    }, session);

    if(result.status === 200) {
      process.env.NODE_ENV === 'development' && 
        console.log(`${chalk.cyan('[PulsarLog]')} Page ${chalk.yellow(data.id)} of documentation ${chalk.yellow(data.docId)} was deleted ${chalk.red('[DELETED]')}`);
      return result;
    } else {
      setResponseStatus(event, result.status, result.message);
      return result;
    }
  } else {
    const err = ErrorMessages.unauthorized();
    setResponseStatus(event, err.status, err.message);
    return err;
  }
});