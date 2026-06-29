import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const allowedOrigins = [
  //   process.env.FRONTEND_URL,
  //   'https://post-automation-psi.vercel.app',
  //   /^https:\/\/post-automation-.*\.vercel\.app$/,
  //   'http://localhost:3000',
  //   'http://localhost:3001',
  //   'http://localhost:5173',
  // ].filter(Boolean);

  app.enableCors({
    // origin: allowedOrigins,
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
