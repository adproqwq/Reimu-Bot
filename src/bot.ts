import { Bot, webhookCallback } from 'grammy';
import xiaohe from './msgHandlers/xiaohe';
import hc from './msgHandlers/hc';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
const bot = new Bot(process.env.BOT_TOKEN);

await bot.api.setMyCommands([
  { command: "xiaohe", description: "小鹤" },
  { command: "hc", description: "hc" },
]);

bot.command(['xiaohe', 'xh', 'xhyx'], async ctx => {
  const message = ctx.match;
  const result = await xiaohe(message);

  try{
    await ctx.reply(result.join(''), {
      reply_parameters: {
        message_id: ctx.msgId,
      },
    });
  } catch{
    bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
  }
});

bot.command('hc', async ctx => {
  const message = ctx.match;
  const result = await hc(message);

  try{
    await ctx.reply(result.join(''), {
      reply_parameters: {
        message_id: ctx.msgId,
      },
    });
  } catch{
    bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
  }
});

bot.on('message', async ctx => {
  const message = ctx.message.text || '';
  let result: string[] = [];

  if(message.startsWith('*小鹤')) result = await xiaohe(message);
  else if(message.startsWith('*hc')) result = await hc(message);
  else return;

  try{
    await ctx.reply(result.join(''), {
      reply_parameters: {
        message_id: ctx.message.message_id,
      },
    });
  } catch{
    bot.api.sendMessage(ctx.chatId, '总之就是我不知道你在说什么喵！');
  }
});

export default webhookCallback(bot, 'https');