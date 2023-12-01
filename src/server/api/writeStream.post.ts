import { WriteStreamBody } from "../streaming/@types/WriteStreamBody";
import { IError } from "~/@types/error";
import { getServerSession } from "#auth";
import { error } from "~/server/utils/error";
import { ErrorMessages } from "../errors";
import { Streaming } from "~/server/streaming";
import chalk from "chalk";

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  
  try {
    const body: WriteStreamBody = await readBody(event);
    if(!session || !session.user) throw ErrorMessages.unauthorized();

    if(body.type && body.id && body.docId && body.content) {
      const stream = await Streaming.writeStream(event, body, session);
      const result = stream as IError;
      
      if(result.status === 200) {
        process.env.NODE_ENV === 'development' && 
          console.log(`${chalk.cyan('[PulsarLog]')} Writable streaming of ${chalk.yellow(body.type)} ${chalk.yellow(body.id)} started on documentation ${chalk.yellow(body.docId)} ${chalk.magenta('[STREAMING][WRITE]')}`);
        return result;
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