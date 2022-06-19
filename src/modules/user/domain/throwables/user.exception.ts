import { HttpStatus } from '@nestjs/common'
import { AbstractException } from 'src/modules/abstract/abstract.exception'
import { UserObject } from '../user.object'

const Key = UserObject.ExceptionKey

const ExceptionList = {
  [Key.ALREADY_IN_COMPANY]: {
    httpStatus: HttpStatus.FORBIDDEN,
    apiCode: `USER/${Key.ALREADY_IN_COMPANY}`,
    log: 'User already in this company',
  },
}

export class UserException extends AbstractException {
  constructor(key: UserObject.ExceptionKey) {
    super(ExceptionList[key])
  }
}
