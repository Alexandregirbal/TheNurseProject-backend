import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'

export namespace SwaggerDocumentation {
  export const create = (app: INestApplication): OpenAPIObject => {
    const config = new DocumentBuilder()
      .setTitle('NursePower')
      .setDescription('NursePower API documentation.')
      .setVersion('1.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, document)

    return document
  }
}
