export class User {
    id: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    type: string = '';
    email: string = '';
    registrationType: string = '';
    registrationTime: Date = new Date();
    image: string = '';
    location: any = { lg: '', lt: '' };
}
