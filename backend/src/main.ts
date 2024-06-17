import { NestFactory } from '@nestjs/core';
import { UserService } from './user/user.service';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aumenta o limite de tamanho da carga útil
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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
