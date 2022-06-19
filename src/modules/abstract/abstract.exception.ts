import { HttpException, Logger } from '@nestjs/common'

export class AbstractException extends HttpException {
  constructor(exception) {
    super(exception, exception.httpStatus)

    Logger.error(exception.log)
  }
}
