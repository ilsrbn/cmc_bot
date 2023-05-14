import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene('Home')
export class HomeScene {
  @SceneEnter()
  async enter(@Ctx() context: SceneContext) {
    context.replyWithHTML('<b>Home</b>\n\nWhat we will do?', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🗃List Active Subscriptions',
              callback_data: 'show_subscriptions',
            },
          ],
          [
            {
              text: '📝Create New Subscription',
              callback_data: 'create_subscription',
            },
          ],
        ],
      },
    });
  }

  @Action('show_subscriptions')
  async onShowAll(
    @Ctx() context: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const cbQuery = context.update.callback_query;
    const userAnswer = 'data' in cbQuery ? cbQuery.data : null;
    if (userAnswer === 'show_subscriptions') {
      return await context.scene.enter('SubsctiptionList');
    } else {
      context.reply('What?');
      await context.scene.reenter();
    }
  }

  @Action('create_subscription')
  async onCreate(
    @Ctx() context: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const cbQuery = context.update.callback_query;
    console.log({ cbQuery });
    const userAnswer = 'data' in cbQuery ? cbQuery.data : null;
    if (userAnswer === 'create_subscription') {
      context.reply('Create subscription');
    } else {
      context.reply('What?');
      await context.scene.reenter();
    }
  }
}
