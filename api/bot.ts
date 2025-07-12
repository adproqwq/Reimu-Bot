import { Bot, webhookCallback } from 'grammy';
import xiaohe from './dicts/xiaohe';
import hc from './dicts/hc';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
const bot = new Bot(process.env.BOT_TOKEN);

bot.on('message', async ctx => {
  const message = ctx.message.text || '';

  if(message.startsWith('*小鹤')){
    const chars = message.split(' ');
    let result: string[] = [];

    for(let i = 1; i < chars.length; i++){
      const charCodes = chars[i].match(/[a-z]+/g);

      if(!charCodes){
        result.push(chars[i]);
        continue;
      }
      const orders = chars[i].match(/[0-9]+/g);

      let text: string;
      try{
        if(!xiaohe.get(charCodes[0])) text = charCodes[i];
        else text = xiaohe.get(charCodes[0])!.values().toArray()[(orders ? Number(orders[0]) : 1) - 1];

        result.push(text);
      } catch(e){
        text = `好像坏掉了呢喵！怎么办喵！快去找主人啊喵！\n告诉主人这个哦喵：${e}`;
        result = [text];
        break;
      }
    }

    try{
      await ctx.reply(result.join(''), {
        reply_parameters: {
          message_id: ctx.message.message_id,
        },
      });
    } catch{
      bot.api.sendMessage(ctx.chatId, '消息找不到了喵！');
    }
  }
  else if(message.startsWith('*hc')){
    const chars = message.split(' ');
    let result: string[] = [];

    for(let i = 1; i < chars.length; i++){
      const charCodes = chars[i].match(/[a-z]+/g);

      if(!charCodes){
        result.push(chars[i]);
        continue;
      }
      const orders = chars[i].match(/[0-9]+/g);

      let text: string;
      try{
        if(!hc.get(charCodes[0])) text = charCodes[i];
        else text = hc.get(charCodes[0])!.values().toArray()[(orders ? Number(orders[0]) : 1) - 1];

        result.push(text);
      } catch(e){
        text = `好像坏掉了呢喵！怎么办喵！快去找主人啊喵！\n告诉主人这个哦喵：${e}`;
        result = [text];
        break;
      }
    }

    try{
      await ctx.reply(result.join(''), {
        reply_parameters: {
          message_id: ctx.message.message_id,
        },
      });
    } catch{
      bot.api.sendMessage(ctx.chatId, '消息找不到了喵！');
    }
  }
});

export default webhookCallback(bot, 'https');