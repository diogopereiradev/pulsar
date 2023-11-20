import os from "os";
import fs, { ReadStream } from "fs";
import { error } from "../utils/error";
import { Session } from "next-auth";
import { H3Event, EventHandlerResponse } from 'h3';
import { ErrorMessages } from "~/server/errors";
import { ReadStreamBody } from "./@types/ReadStreamBody";
import { IError } from "~/@types/error";
import { WriteStreamBody } from "./@types/WriteStreamBody";

export class Streaming {
  static async readStream(event: H3Event<EventHandlerResponse>, data: ReadStreamBody, session?: Session | string): Promise<ReadStream | IError> {
    try {
      if(data.type === 'page' || data.type === 'customization') {
        const authorIdentifier = data.authorIdentifier? data.authorIdentifier : session? getAuthIdentifier(session as Session).identifier : session as string;

        if(!authorIdentifier) throw ErrorMessages.unauthorized();

        const paths = this.streamPaths(data, authorIdentifier);
        const path = data.type === 'page'? `${paths.pages}/${data.id}.md` : `${paths.customizations}/${data.id}.json`;
        const exists = fs.existsSync(path);

        if(exists) {
          const stream = fs.createReadStream(path);
          return stream;
        } else {
          throw ErrorMessages.notfound();
        }
      }
      throw ErrorMessages.custom(404, 'The body passed is invalid, check the type property: page | customization')
    } catch(err) {
      const perr = error(err);
      setResponseStatus(event, perr.status, perr.message);
      return error(err);
    }
  }

  static async writeStream(event: H3Event<EventHandlerResponse>, data: WriteStreamBody, session: Session): Promise<{ status: 200 } | IError> {
    try {
      if(data.type === 'page' || data.type === 'customization') {
        const paths = this.streamPaths(data, session);
        const path = data.type === 'page'? `${paths.pages}/${data.id}.md` : `${paths.customizations}/${data.id}.json`;
  
        const pathExists = fs.existsSync(path);
        
        if(pathExists) {
          const stream = fs.createWriteStream(path);
          stream.write(data.content);
          stream.end();
  
          return {
            status: 200
          };
        } else {
          throw ErrorMessages.notfound();
        }
      }
      throw ErrorMessages.custom(404, 'The body passed is invalid, check the type property: page | customization')
    } catch(err) {
      const perr = error(err);
      setResponseStatus(event, perr.status, perr.message);
      return error(err);
    }
  }

  static streamingCreateFiles(data: ReadStreamBody, session: Session) {
    const paths = this.streamPaths(data, session);
  
    try {
      if(data.type === 'page') {
        fs.mkdirSync(paths.pages, { recursive: true });
        fs.writeFileSync(`${paths.pages}/${data.id}.md`, '');
        return { status: 200 }
      } else if(data.type === 'customization') {
        fs.mkdirSync(paths.customizations, { recursive: true });
        fs.writeFileSync(`${paths.customizations}/${data.id}.json`, '{}');
        return { status: 200 }
      } else {
        throw ErrorMessages.custom(404, 'Invalid body property type: page | customization');
      }
    } catch(err) {
      return error(err);
    }
  }

  static streamingDeleteFiles(data: ReadStreamBody, session: Session): Partial<IError> {
    const paths = this.streamPaths(data, session);

    const deletePath = (path: string) => {
      const exists = fs.existsSync(path);

      if(!exists) return ErrorMessages.notfound();
      fs.unlinkSync(path);
      return { status: 200 };
    };
  
    try {
      if(data.type === 'page') {
        return deletePath(`${paths.pages}/${data.id}.md`);
      } else if(data.type === 'customization') {
        return deletePath(`${paths.customizations}/${data.id}.json`);
      } else {
        throw ErrorMessages.custom(404, 'Invalid body property type: page | customization');
      }
    } catch(err) {
      return error(err);
    }
  }

  static streamPaths(data: { docId: string }, session: Session | string) {
    const authorIdentifier = typeof session !== 'string'? getAuthIdentifier(session).identifier : session;
    const dataPath = `${os.homedir()}/.pulsar/${authorIdentifier}/documentations/${data.docId}`;
  
    return {
      docPath: dataPath,
      pages: `${dataPath}/pages`,
      customizations: `${dataPath}/customizations`
    };
  }
}