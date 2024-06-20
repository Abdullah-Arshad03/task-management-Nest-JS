import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';


async function bootstrap() {

  const port = 3000
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(port);
  logger.log(`app is listening on the ${port}`)

}
bootstrap();
