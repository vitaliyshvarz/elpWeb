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
    location: any = { };

    constructor(params: any) {
      this.id  = params.id;
      this.password  = params.password;
      this.firstName  = params.firstName;
      this.lastName  = params.lastName;
      this.type  = params.type;
      this.email  = params.email;
      this.registrationType  = params.registrationType;
      this.registrationTime  = params.registrationTime;
      this.image  = params.image;
      this.location  = params.location;
    }
}
