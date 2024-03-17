import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger')
    .setDescription(
      `Todas os endpoints (com exceção de POST /user e POST /singin) exigem o header Authorization. 
      Para ter acessos a todos endpoints é necessario cadastrar o token JWT no botao verde com cadeado escrito "Authorize" ( token é obtido no endpoint POST /signin).`,
    )
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .addTag('task')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
