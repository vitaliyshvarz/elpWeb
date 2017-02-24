import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { ADMIN_EMAILS } from '../config/admins';

@Injectable()
export class UserService implements OnInit {
    private subject: Subject<{}> = new Subject<{}>();
    private user: User;
    private coords: any;
    private adminEmails: any = ADMIN_EMAILS;

    constructor(private http: Http) { }

    ngOnInit() {
        window.navigator.geolocation.getCurrentPosition(position => {
            this.coords = position.coords;
        });
    }

    private isAdmin(userData: any) {
        return this.adminEmails.indexOf(userData.email) !== -1;
    }

    public getAll() {
        return this.http.get('/api/users', this.jwt())
            .map((response: Response) => response.json());
    }

    public getById(id: any) {
        return this.http.get('/api/users/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    public create(userData: any) {
        this.user = {
            id: userData.id,
            password: userData.password || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            type: this.isAdmin(userData) ? 'admin' : 'default',
            email: userData.email,
            registrationType: userData.registrationType,
            registrationTime: new Date(),
            image: userData.image,
            location: this.coords
        };

        return this.http.post('/api/users', this.user, this.jwt())
            .map((response: Response) => {
                if (response.status === 200) {
                    this.subject.next(status);
                }
                return response;
            });
    }

    public registerationSuccess(): Observable<{}> {
        return this.subject.asObservable();
    }

    public update(user: User) {
        console.log(user);
        return this.http.put('/api/users/' + user.id, user, this.jwt())
            .map((response: Response) => response.json());
    }

    public delete(id: any) {
        return this.http.delete('/api/users/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        const userData: any = JSON.parse(localStorage.getItem('currentUser')) || {};
        let currentUser = !!userData.firstName ? userData : null;
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
