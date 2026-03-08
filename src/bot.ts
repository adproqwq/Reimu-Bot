import { Bot, webhookCallback } from 'grammy';
import xiaohe from './msgHandlers/xiaohe';
import cangjie from './msgHandlers/cangjie';
import wubi86 from './msgHandlers/wubi86';
import { Reverse } from './reverse/Reverse';

export interface Env {
  BOT_INFO: string;
  BOT_TOKEN: string;
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>{
    if (!env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
    const bot = new Bot(env.BOT_TOKEN, { botInfo: JSON.parse(env.BOT_INFO) });

    await bot.api.setMyCommands([
      { command: 'help', description: '帮助' },
      { command: 'xiaohe', description: '小鹤音形' },
      { command: 'cangjie', description: '仓颉' },
      { command: 'wubi86', description: '五笔86' },
    ]);

    bot.command('help', async ctx => {
      const help = `码->文：
- 小鹤音形 xiaohe xh xhyx *小鹤
- 仓颉 cangjie cj *仓颉
- 五笔86 wubi86 wb86 *五笔86

字->码：
- 小鹤音形 -小鹤
- 仓颉 -仓颉
- 五笔86 -五笔86`;
      await ctx.reply(help, {
        reply_parameters: {
          message_id: ctx.msgId,
        },
      });
    });

    bot.command(['xiaohe', 'xh', 'xhyx'], async ctx => {
      const message = ctx.msg.text;
      const result = await xiaohe(message);

      try{
        let messageId: number;

        if(ctx.msg.reply_to_message) messageId = ctx.msg.reply_to_message.message_id;
        else messageId = ctx.msgId;

        await ctx.reply(result.join(''), {
          reply_parameters: {
            message_id: messageId,
          },
        });
      } catch{
        bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
      }
    });

    bot.command(['cangjie', 'cj'], async ctx => {
      const message = ctx.msg.text;
      const result = await cangjie(message);

      try{
        let messageId: number;

        if(ctx.msg.reply_to_message) messageId = ctx.msg.reply_to_message.message_id;
        else messageId = ctx.msgId;

        await ctx.reply(result.join(''), {
          reply_parameters: {
            message_id: messageId,
          },
        });
      } catch{
        bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
      }
    });

    bot.command(['wubi86', 'wb86'], async ctx => {
      const message = ctx.msg.text;
      const result = await wubi86(message);

      try{
        let messageId: number;

        if(ctx.msg.reply_to_message) messageId = ctx.msg.reply_to_message.message_id;
        else messageId = ctx.msgId;

        await ctx.reply(result.join(''), {
          reply_parameters: {
            message_id: messageId,
          },
        });
      } catch{
        bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
      }
    });

    bot.on('message', async ctx => {
      const message = ctx.message.text || '';
      let result: string[] = [];

      if(message.startsWith('*')){
        if(message.startsWith('*小鹤')) result = await xiaohe(message);
        else if(message.startsWith('*仓颉')) result = await cangjie(message);
        else if(message.startsWith('*五笔86')) result = await wubi86(message);
        else return;

        try{
          let messageId: number;

          if(ctx.message.reply_to_message) messageId = ctx.message.reply_to_message.message_id;
          else messageId = ctx.message.message_id;

          await ctx.reply(result.join(''), {
            reply_parameters: {
              message_id: messageId,
            },
          });
        } catch{
          bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
        }
      }
      else if(message.startsWith('-')){
        if(message.startsWith('-小鹤')) result = new Reverse(message).reverse('xiaohe');
        else if(message.startsWith('-仓颉')) result = new Reverse(message).reverse('cangjie');
        else if(message.startsWith('-五笔86')) result = new Reverse(message).reverse('wubi86');
        else return;

        try{
          let messageId: number;

          if(ctx.message.reply_to_message) messageId = ctx.message.reply_to_message.message_id;
          else messageId = ctx.message.message_id;

          await ctx.reply(result.join(' '), {
            reply_parameters: {
              message_id: messageId,
            },
          });
        } catch{
          bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
        }
      }
    });

    return webhookCallback(bot, 'cloudflare-mod')(request);
  },
};
