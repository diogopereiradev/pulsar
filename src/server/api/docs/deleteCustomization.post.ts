import { getServerSession } from "#auth";
import chalk from "chalk";
import { ErrorMessages } from "~/server/errors";
import { Streaming } from "~/server/streaming";
import { ReadStreamBody } from "~/server/streaming/@types/ReadStreamBody";

type BodyData = {
  docId: string,
  id: string
};

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const body = await readBody(event) as BodyData;

  if(session && session.user && body) {
    const data = body as Omit<ReadStreamBody, 'type'>;
    const result = Streaming.streamingDeleteFiles({
      type: 'customization',
      docId: data.docId,
      id: data.id
    }, session);

    process.env.NODE_ENV === 'development' && 
      console.log(`${chalk.cyan('[PulsarLog]')} Customization ${chalk.yellow(data.id)} of documentation ${chalk.yellow(data.docId)} was deleted ${chalk.red('[DELETED]')}`);

    return result;
  } else {
    const err = ErrorMessages.unauthorized();
    setResponseStatus(event, err.status, err.message);
    return err;
  }
});