import { Update, Hears, Start, InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BOT_NAME } from './constants/base.constants';

@Update()
export class AppTest {
  constructor(
    @InjectBot(BOT_NAME)
    private bot: Telegraf<Context>,
  ) {}
  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hola, I'm ${me.username}`;
  }

  @Hears('привет')
  onHello(): string {
    return 'Hola';
  }
}
