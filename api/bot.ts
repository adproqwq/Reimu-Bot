import { Bot } from 'grammy';
import xiaohe from './dicts/xiaohe';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
const bot = new Bot(process.env.BOT_TOKEN);

bot.on('message', async ctx => {
  const message = ctx.message.text || '';

  if(message.startsWith('*小鹤')){
    const chars = message.split(' ');
    const result: string[] = [];

    for(let i = 1; i < chars.length; i++){
      result.push(xiaohe.get(chars[i]) || chars[i]);
    }

    await ctx.reply(result.join(), {
      reply_parameters: {
        message_id: ctx.message.message_id,
      },
    });
  }
});