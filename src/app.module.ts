import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppComponent } from './app.scene';
import { HomeScene } from './scene/home.scene';
import * as dotenv from 'dotenv';
import { sessionMiddleware } from './middleware/session.middleware';
import { BOT_NAME } from './constants/base.constants';
import { SubsctiptionListScene } from './scene/subscription/list.sunscription.scene';
dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('Token not provided!');

@Module({
  imports: [
    AppComponent,
    HomeScene,
    SubsctiptionListScene,
    TelegrafModule.forRoot({
      token,
      botName: BOT_NAME,
      middlewares: [sessionMiddleware],
    }),
  ],
  providers: [],
})
export class AppModule {}
