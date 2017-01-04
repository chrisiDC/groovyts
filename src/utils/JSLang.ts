export class ArrayUtils
{
    public static indexOf(o: any, keyAttribute: string, key: any, arr: Array<any>): number {
        return arr.map((x)=> {
            return x[keyAttribute];
        }).indexOf(key);

    }

    public static remove(o: any, keyAttribute: string, key: any, arr: Array<any>): void {

        let index = ArrayUtils.indexOf(o,keyAttribute,key,arr);
        arr.splice(index,1);

    }
}