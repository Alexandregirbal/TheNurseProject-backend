import { NestApplicationOptions, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import config from './config'
import { SwaggerDocumentation } from './documentation/swagger.documentation'

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    cors: true,
    // logger: ['error', 'warn'],
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions)

  const validationPipeOptions: ValidationPipeOptions = {
    disableErrorMessages: config().node == 'DEV' ? false : true, //true in production
  }

  const validationPipe = new ValidationPipe(validationPipeOptions)
  app.useGlobalPipes(validationPipe)

  SwaggerDocumentation.create(app)

  await app.listen(config().port)
}
bootstrap()
