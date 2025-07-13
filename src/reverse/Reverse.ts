import xiaohe from '../dicts/xiaohe';
import hc from '../dicts/hc';
import cangjie from '../dicts/cangjie';
import wubi86 from '../dicts/wubi86';
import wubi98 from '../dicts/wubi98';

export class Reverse {
  private msg: string;
  private types: Map<string, Map<string, Set<string>>> = new Map([
    ['xiaohe', xiaohe],
    ['hc', hc],
    ['cangjie', cangjie],
    ['wubi86', wubi86],
    ['wubi98', wubi98],
  ]);

  constructor(message: string){
    this.msg = message;
  };

  public reverse(type: string){
    const map = this.types.get(type)!;

    const char = this.msg.split(' ')[1];
    const result: string[] = [];

    map.forEach((chars, code) => {
      if(chars.has(char)){
        const array = chars.values().toArray();

        for(let i = 0; i < array.length; i++){
          if(array[i] === char){
            result.push(`${code}(${String(i + 1)})`);
            break;
          }
        }
      }
    });

    return result;
  };
};