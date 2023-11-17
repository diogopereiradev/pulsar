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
    const data = body as Omit<ReadStreamBody, 'type'>;
    const result = Streaming.streamingCreateFiles({
      type: 'page',
      docId: data.docId,
      id: data.id
    }, session);

    process.env.NODE_ENV === 'development' && 
      console.log(`${chalk.cyan('[PulsarLog]')} New page ${chalk.yellow(data.id)} of documentation ${chalk.yellow(data.docId)} file was created ${chalk.green('[CREATED]')}`);

    return result;
  } else {
    const err = ErrorMessages.unauthorized();
    setResponseStatus(event, err.status, err.message);
    return err;
  }
});