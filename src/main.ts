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
  const globalPrefix = process.env.GLOBAL_PREFIX;
  if (globalPrefix) app.setGlobalPrefix(globalPrefix);

  let title = 'Board Rank';
  if (process.env.NODE_ENV !== 'production')
    title = `Board Rank(${process.env.NODE_ENV})`;

  const documentBuilder = new DocumentBuilder()
    .setTitle(title)
    .setDescription(`Board Rank API for ${process.env.NODE_ENV}`)
    .setVersion('1.0')
    .setExternalDoc('JSON Specification', '/swagger-ui-json')
    .addBearerAuth();

  Object.values(SwaggerTag).forEach((value) => documentBuilder.addTag(value));

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels,
  });

  let swaggerPath = `swagger-ui`;
  if (globalPrefix) swaggerPath = `${globalPrefix}/swagger-ui`;
  SwaggerModule.setup(swaggerPath, app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
