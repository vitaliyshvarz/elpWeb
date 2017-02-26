
export class Portion {
    id: number;
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
    postions: Portion[];
}
