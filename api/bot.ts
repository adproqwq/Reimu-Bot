import { Bot, webhookCallback } from 'grammy';
import xiaohe from './dicts/xiaohe';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
const bot = new Bot(process.env.BOT_TOKEN);

bot.on('message', async ctx => {
  const message = ctx.message.text || '';

  if(message.startsWith('*小鹤')){
    const chars = message.split(' ');
    const result: string[] = [];

    for(let i = 1; i < chars.length; i++){
      const charCodes = chars[i].match(/[a-z]+/g);

      if(!charCodes){
        result.push(chars[i]);
        continue;
      }
      const orders = chars[i].match(/[0-9]+/g);

      result.push(xiaohe.get(charCodes[i])!.values().toArray()[(orders ? Number(orders[0]) : 1) - 1] || charCodes[i]);
    }

    await ctx.reply(result.join(''), {
      reply_parameters: {
        message_id: ctx.message.message_id,
      },
    });
  }
});

export default webhookCallback(bot, 'https');