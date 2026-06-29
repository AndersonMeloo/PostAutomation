import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://post-automation-psi.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
