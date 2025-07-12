import { Bot, webhookCallback } from 'grammy';
import xiaohe from './msgHandlers/xiaohe';
import hc from './msgHandlers/hc';
import cangjie from './msgHandlers/cangjie';
import zhengma from './msgHandlers/zhengma';
import wubi86 from './msgHandlers/wubi86';
import wubi98 from './msgHandlers/wubi98';

if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN is unset');
const bot = new Bot(process.env.BOT_TOKEN);

await bot.api.setMyCommands([
  { command: 'help', description: '帮助' },
  { command: 'xiaohe', description: '小鹤音形' },
  { command: 'hc', description: 'hc' },
  { command: 'cangjie', description: '仓颉' },
  { command: 'zhengma', description: '郑码' },
  { command: 'wubi86', description: '五笔86' },
  { command: 'wubi98', description: '五笔98' },
]);

bot.command('help', async ctx => {
  const help = `- 小鹤音形 xiaohe xh xhyx *小鹤
- hc hc *hc
- 仓颉 cangjie cj *仓颉
- 郑码 zhengma zheng zm *郑
- 五笔86 wubi86 wb86 *五笔86
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

bot.command(['cangjie', 'cj'], async ctx => {
  const message = ctx.msg.text;
  const result = await cangjie(message);

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

bot.command(['zhengma', 'zm', 'zheng'], async ctx => {
  const message = ctx.msg.text;
  const result = await zhengma(message);

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

bot.command(['wubi86', 'wb86'], async ctx => {
  const message = ctx.msg.text;
  const result = await wubi86(message);

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
  else if(message.startsWith('*仓颉')) result = await cangjie(message);
  else if(message.startsWith('*郑')) result = await zhengma(message);
  else if(message.startsWith('*五笔86')) result = await wubi86(message);
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

export default webhookCallback(bot, 'https');