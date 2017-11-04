export class Utilities {
    public static removeUndefined(obj: any) {
        const res: Object = (<any>Object).assign({}, obj);

        for (const key of Object.keys(obj)) {
            if (obj[key] === undefined) {
                delete obj[key];
            }
        }
        return res;
    }
}