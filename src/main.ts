import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Your App Name')
    .setDescription('Your App Description')
    .setVersion('1.0')
    .addTag('users', 'User operations') // Add tags for your controllers here
    .addTag('talent-list')
    .addTag('post')
    .addTag('teacher')
    .addTag('lesson')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
