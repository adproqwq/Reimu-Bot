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
      const charCodes = chars[i].match(/[a-z]*/g);

      if(!charCodes){
        result.push(chars[i]);
        continue;
      }
      const orders = chars[i].match(/[0-9]*/g);

      const splited = [];
      const length = charCodes[0].length;
      const groups = Math.ceil(length / 4);

      for(let j = 0; j < groups; j++){
        splited.push(charCodes[0].substring(j * 4, (j + 1) * 4));
      }

      for(let j = 0; j < splited.length; j++){
        if (j !== splited.length - 1) result.push(xiaohe.get(splited[j])?.values().toArray()[0] || chars[j]);
        else result.push(xiaohe.get(splited[j])?.values().toArray()[(orders ? Number(orders[0]) : 1) - 1] || chars[j]);
      }
    }

    await ctx.reply(result.join(''), {
      reply_parameters: {
        message_id: ctx.message.message_id,
      },
    });
  }
});

export default webhookCallback(bot, 'https');