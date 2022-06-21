import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'prod' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MediMedi', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });

  app.enableCors({
    origin: [/http:\/\/localhost:[0-9]+$/, /https:\/\/medimedi\.info$/],
  });
  await app.listen(8080);
}
bootstrap();
