import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return 'Welcome on the NursePower API! Please refer to the documentation for more information.';
  }
}
