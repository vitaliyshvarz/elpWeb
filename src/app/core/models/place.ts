import { User }  from './user';

export class Place {
    id: number;
    googleId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    city: string;
    website: string;
    user: User;
    location: any = {
        lat: 0,
        lng: 0
    };
}
