import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'libs/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { SwaggerTag } from 'libs/constants';
import extraModels from 'libs/swaggers/extraModels';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const documentBuilder = new DocumentBuilder()
    .setTitle('Board Rank')
    .setDescription('Board Rank API')
    .setVersion('1.0')
    .setExternalDoc('JSON Specification', '/swagger-ui-json')
    .addBearerAuth();

  Object.values(SwaggerTag).forEach((value) => documentBuilder.addTag(value));

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels,
  });
  SwaggerModule.setup('swagger-ui', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
