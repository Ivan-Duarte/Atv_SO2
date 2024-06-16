import { NestFactory } from '@nestjs/core';
import { UserService } from './user/user.service';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuração do CORS
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Permitir ambas as origens
    credentials: true,
  }));


  await app.listen(5000);

  const userService = app.get(UserService)
  await userService.create_admin()
}
bootstrap();
