import { User }  from './user';

export class Place {
    _id: number;
    googleId: string;
    name: string;
    email: string;
    phone: string;
    fullAddress: string;
    website: string;
    currency: {
        name: string;
        postfix: string;
    };
    elp_opening_hours: [
        {
            break: {
                from: string;
                fromMin: string;
                to: string;
                toMin: string;
            },
            business_hours: {
                from: string;
                fromMin: string;
                to: string;
                toMin: string;
            },
            hasBreak: boolean;
            name; string;
            selected: boolean;
        }
    ];
    mealIds: [string]
    deliveryAvailable: boolean;
    takeAwayAvailable: boolean;
    user: User;
    location: any = {
        lat: number;
        lng: number;
    };
    paymentOptions: [
        {
            image: string;
            name: string;
            selected: boolean;
        }
    ];
    rating: number;
}
