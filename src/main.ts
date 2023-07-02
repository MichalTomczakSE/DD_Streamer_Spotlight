import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle("Streamer Spotlight")
      .setDescription("The streamer spotlight API description")
      .setVersion("1.0")
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors();
  app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: false,
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        }
      })
  );
  await app.listen(3001);
}

bootstrap();
