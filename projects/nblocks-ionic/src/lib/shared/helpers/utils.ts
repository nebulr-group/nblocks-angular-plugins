export class Utils {
    static deepClone<Type>(data: Type):Type {
        return JSON.parse(JSON.stringify(data));
    }
}