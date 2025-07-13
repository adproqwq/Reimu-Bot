import xiaohe from '../dicts/xiaohe';

export default async (message: string): Promise<string[]> => {
  const char = message.split(' ')[1];
  const result: string[] = [];

  xiaohe.forEach((chars, code) => {
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