import { NestFactory } from '@nestjs/core';
import { UserService } from './user/user.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
  
  const userService = app.get(UserService)
  await userService.create_admin()
}
bootstrap();
