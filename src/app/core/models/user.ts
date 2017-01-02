export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    type: string = 'default';
    email: string;
    registrationType: string;
    registrationTime: string;
    location: any = {
        lat: 0,
        lng: 0
    };
}
