export class Category {
    Id: number;
    Name: string = '';
    ShopId: number = 0;
    ShopName: string = '';

    constructor(values: Object = {}) {
        (<any>Object).assign(this, values);
    }
}