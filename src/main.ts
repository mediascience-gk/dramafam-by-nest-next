import { NestFactory } from '@nestjs/core';
import { EntryModule } from './modules/entry.module';

async function bootstrap() {
  const app = await NestFactory.create(EntryModule);
  await app.listen(3000);
}
bootstrap();
