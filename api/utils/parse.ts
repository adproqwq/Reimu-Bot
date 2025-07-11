export default (argArray: [string, string][]): [string, Set<string>][] => {
    const keys: string[] = [];
    const values: Set<string>[] = [];

    argArray.forEach(charCode => {
      if(keys.indexOf(charCode[0]) === -1){
        keys.push(charCode[0]);
        values.push(new Set<string>([charCode[1]]));
      }
      else{
        const index = keys.indexOf(charCode[0]);
        const set = values[index];

        set.add(charCode[1]);
      }
    });

    const newCharCodes: [string, Set<string>][] = [];

    keys.forEach((key, index) => {
      newCharCodes.push([key, values[index]]);
    });

    return newCharCodes;
};