import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppTest } from './app.test';
import * as dotenv from 'dotenv';
import { sessionMiddleware } from './middleware/session.middleware';
import { BOT_NAME } from './constants/base.constants';
dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Token not provided!');

@Module({
  imports: [
    AppTest,
    TelegrafModule.forRoot({
      token,
      botName: BOT_NAME,
      middlewares: [sessionMiddleware],
    }),
  ],
})
export class AppModule {}
