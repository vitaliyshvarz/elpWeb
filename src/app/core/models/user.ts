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

    constructor({
        id = '',
        password = '',
        firstName = '',
        lastName = '',
        type = 'default',
        email = '',
        registrationType = '',
        registrationTime = new Date(),
        image = '',
        location= { lg:'', lt: ''}
      } = {}) {
      this.id  = id;
      this.password  = password;
      this.firstName  = firstName;
      this.lastName  = lastName;
      this.type  = type;
      this.email  = email;
      this.registrationType  = registrationType;
      this.registrationTime  = registrationTime;
      this.image  = image;
      this.location  = location;
    }
}
