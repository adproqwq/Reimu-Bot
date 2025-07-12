import { Bot, Context, Api, RawApi } from 'grammy';
import hc from '../dicts/hc';

export default async (bot: Bot<Context, Api<RawApi>>, message: string): Promise<string[]> => {
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

  return result;
};