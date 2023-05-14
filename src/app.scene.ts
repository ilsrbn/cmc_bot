import { Start, Update } from 'nestjs-telegraf';
import { Ctx } from 'nestjs-telegraf';
import { Context } from './interface/context.interface';

@Update()
export class AppComponent {
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.scene.enter('Home');
    // context.scene.enter('Home');
  }
}
