import { ReadStreamBody } from "../streaming/@types/ReadStreamBody";
import { IError } from "~/@types/error";
import { getServerSession } from "#auth";
import { ErrorMessages } from "../errors";
import { ReadStream } from "fs";
import { Streaming } from "~/server/streaming";
import { error } from "~/server/utils/error";
import chalk from "chalk";

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  
  try {
    const body: ReadStreamBody = await readBody(event);
    if(!session || !session.user) throw ErrorMessages.unauthorized();

    if(body.type && body.id && body.docId) {
      const stream = await Streaming.readStream(event, body, session);
      const result = stream as IError;
      
      if(!result.status) {
        process.env.NODE_ENV === 'development' && 
          console.log(`${chalk.cyan('[PulsarLog]')} Reading streaming of ${chalk.yellow(body.type)} ${chalk.yellow(body.id)} started on documentation ${chalk.yellow(body.docId)} ${chalk.magenta('[STREAMING][READ]')}`);
        return sendStream(event, stream as ReadStream);
      } else {
        return result;
      }
    }
    throw ErrorMessages.unauthorized();
  } catch(err) {
    const perr = error(err);
    setResponseStatus(event, perr.status, perr.message);
    return perr;
  }
});