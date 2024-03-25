import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { static as static_ } from 'express';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder().setTitle('Benco API').setDescription('Benco API Description').setVersion('1.0').build();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:8000', 'http://localhost', 'localhost'],
    credentials: true,
    preflightContinue: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  app.use('/uploads', static_(join(__dirname, '..', 'public', 'uploads')));
  app.use(helmet());
  app.use(cookieParser());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}

bootstrap();
