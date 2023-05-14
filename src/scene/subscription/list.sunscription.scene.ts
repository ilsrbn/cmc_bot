import { Ctx, Scene, SceneEnter, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import {
  InlineKeyboardMarkup,
  Update,
} from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

const regex = /select_(?<id>\d+)/;
const subs = [
  {
    id: 1,
    pair: 'wsbc/weth',
    name: 'WSB Classic',
  },
  {
    id: 2,
    pair: 'btc/usdt',
    name: 'Bitcoin',
  },
];

@Scene('SubsctiptionList')
export class SubsctiptionListScene {
  @SceneEnter()
  async onEnter(@Ctx() context: SceneContext) {
    const keyboard = [
      [{ text: 'Go Home', callback_data: 'go_home' }],
      [
        ...subs.map((subscription, i) => ({
          text: `${i + 1}. ${subscription.name}\n ${subscription.pair}`,
          callback_data: `select_${subscription.id}`,
        })),
      ],
    ];
    context.replyWithHTML(
      "<b>Active subscriptions</b>\n\nYou can select any active subsctipion to view it's details or delete it.",
      {
        reply_markup: {
          inline_keyboard: keyboard,
          force_reply: true,
        },
      },
    );
  }

  @Action('go_home')
  async onGoHome(@Ctx() context: SceneContext) {
    return await context.scene.enter('Home');
  }

  @Action(regex)
  async selectSubscription(
    @Ctx() context: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    console.log('Reached');
    const cbQuery = context.update.callback_query;
    const userAnswer = 'data' in cbQuery ? cbQuery.data : null;
    const match = userAnswer?.match(regex);
    const id = match?.groups?.id;
    const subscription = subs.find((el) => el.id === +id!);
    if (!subscription) {
      context.reply('What?');
      context.scene.reenter();
    } else {
      context.reply(`${subscription.name} - ${subscription.pair}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Back to all subs', callback_data: 'reenter' }],
            [{ text: 'Back to Home', callback_data: 'home' }],
            [{ text: 'Delete', callback_data: 'delete' }],
          ],
        },
      });
    }
  }
  @Action('reenter')
  async reEnter(@Ctx() context: SceneContext) {
    context.scene.reenter();
  }
  @Action('home')
  async home(@Ctx() context: SceneContext) {
    context.scene.enter('Home');
  }
  @Action('delete')
  async delete(@Ctx() context: SceneContext) {
    await context.reply('Deleted');
    context.scene.enter('Home');
  }
}
