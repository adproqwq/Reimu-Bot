import { Bot, webhookCallback } from 'grammy';
import xiaohe from './msgHandlers/xiaohe';
import hc from './msgHandlers/hc';
import cangjie from './msgHandlers/cangjie';
import wubi86 from './msgHandlers/wubi86';
import wubi98 from './msgHandlers/wubi98';
import xiaoheReverse from './reverse/xiaoheReverse';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
const bot = new Bot(process.env.BOT_TOKEN);

await bot.api.setMyCommands([
  { command: 'help', description: '帮助' },
  { command: 'xiaohe', description: '小鹤音形' },
  { command: 'hc', description: 'hc' },
  { command: 'cangjie', description: '仓颉' },
  { command: 'wubi86', description: '五笔86' },
  { command: 'wubi98', description: '五笔98' },
]);

bot.command('help', async ctx => {
  const help = `码->文：
- 小鹤音形 xiaohe xh xhyx *小鹤
- hc hc *hc
- 仓颉 cangjie cj *仓颉
- 五笔86 wubi86 wb86 *五笔86
- 五笔98 wubi98 wb98 *五笔98

字->码：
- 小鹤音形 -小鹤`;
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

bot.command('hc', async ctx => {
  const message = ctx.msg.text;
  const result = await hc(message);

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

bot.command(['wubi98', 'wb98'], async ctx => {
  const message = ctx.msg.text;
  const result = await wubi98(message);

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

  if(message.startsWith('*小鹤')) result = await xiaohe(message);
  else if(message.startsWith('*hc')) result = await hc(message);
  else if(message.startsWith('*仓颉')) result = await cangjie(message);
  else if(message.startsWith('*五笔86')) result = await wubi86(message);
  else if(message.startsWith('*五笔98')) result = await wubi98(message);

  else if(message.startsWith('-小鹤')) result = await xiaoheReverse(message);
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
});

export default webhookCallback(bot, 'https');