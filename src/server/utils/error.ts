import { IError } from '~/@types/error';

export function error(err: unknown): IError {
  try {
    const perr = err as IError;
    if(!perr || !perr.status || !perr.message) throw {
      status: 500,
      message: 'Internal server error'
    };
    return err as IError;
  } catch(cerr) {
    process.env.NODE_ENV === 'development' && console.log(err);
    return cerr as IError;
  }
}