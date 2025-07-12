import { Bot, webhookCallback, InlineQueryResultBuilder } from 'grammy';
import type { InlineQueryResultArticle } from 'grammy/types';
import xiaohe from './msgHandlers/xiaohe';
import hc from './msgHandlers/hc';
import wubi98 from './msgHandlers/wubi98';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
const bot = new Bot(process.env.BOT_TOKEN);

await bot.api.setMyCommands([
  { command: 'help', description: '帮助' },
  { command: 'xiaohe', description: '小鹤音形' },
  { command: 'hc', description: 'hc' },
  { command: 'wubi98', description: '五笔98' },
]);

bot.command('help', async ctx => {
  const help = `- 小鹤音形 xiaohe xh xhyx *小鹤
- hc hc *hc
- 五笔98 wubi98 wb98 *五笔98`;
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
  const message = ctx.msg.text;
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

bot.command(['wubi98', 'wb98'], async ctx => {
  const message = ctx.msg.text;
  const result = await wubi98(message);

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
  else if(message.startsWith('*五笔98')) result = await wubi98(message);
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

bot.on('inline_query', async ctx => {
  const message = ctx.inlineQuery.query || '';
  let result: string[] = [];
  let inlineResult: InlineQueryResultArticle;

  if(message.startsWith('*小鹤')) result = await xiaohe(message);
  else if(message.startsWith('*hc')) result = await hc(message);
  else if(message.startsWith('*五笔98')) result = await wubi98(message);
  else return;

  try{
    inlineResult = InlineQueryResultBuilder.article('id-0', '结果').text(result.join(''));
  } catch{
    inlineResult = InlineQueryResultBuilder.article('id-0', '结果').text('总之就是我不知道你在说什么喵！');
  }

  await ctx.answerInlineQuery([inlineResult]);
});

export default webhookCallback(bot, 'https');