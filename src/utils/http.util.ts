import { ArgumentsHost, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export enum HttpStatusCategory {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
export class HttpUtil {
  static async getRequest(context: ExecutionContext | ArgumentsHost) {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()

    return request
  }

  static getStatusCategory(status: number): HttpStatusCategory {
    const category = Math.floor(status / 100)

    switch (category) {
      case 2:
      case 3:
        return HttpStatusCategory.SUCCESS
      case 4:
      case 5:
        return HttpStatusCategory.ERROR
    }
  }
}
