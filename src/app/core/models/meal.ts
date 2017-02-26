
export class Portion {
    size: string;
    selected: boolean;
    description: string;
    price: number;
    weight: number;
}

export class Meal {
    id: number;
    selected: boolean;
    name: string;
    description: string;
    imageUrl: string;
    portions: Portion[];
}
