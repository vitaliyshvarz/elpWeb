export class Dish {
    id: number;
    selected: boolean;
    name: string;
    description: string;
    imageUrl: string;
    postions: any = [
        {
            id: number;
            size: string;
            selected: boolean;
            description: string;
            price: number;
            weight: number;
        }
    ];
}
