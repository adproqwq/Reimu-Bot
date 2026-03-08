import { Bot, webhookCallback } from 'grammy';

export interface Env {
  BOT_INFO: string;
  BOT_TOKEN: string;
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>{
    if (!env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
    const bot = new Bot(env.BOT_TOKEN, { botInfo: JSON.parse(env.BOT_INFO) });

    bot.command('help', async ctx => {
      const help = `暂时不知道用来干什么喵`;
      await ctx.reply(help, {
        reply_parameters: {
          message_id: ctx.msgId,
        },
      });
    });

    bot.on('message', async ctx => {
      const message = ctx.message.text || '';

      if(message.toLowerCase() === 'qwqa'){
        try{
          let messageId: number;

          if(ctx.message.reply_to_message) messageId = ctx.message.reply_to_message.message_id;
          else messageId = ctx.message.message_id;

          await ctx.react('🥰');
          await ctx.reply('qwqa', {
            reply_parameters: {
              message_id: messageId,
            },
          });
        } catch{
          bot.api.sendMessage(ctx.chatId, 'Someone tells Aone there are some problems with my codes');
        }
      }
    });

    return webhookCallback(bot, 'cloudflare-mod')(request);
  },
};
