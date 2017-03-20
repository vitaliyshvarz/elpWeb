import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AlertService }                            from '../services/alert.service';
import { User } from '../models/user';
import { ADMIN_EMAILS } from '../config/admins';


@Injectable()
export class UserService implements OnInit {
    private subject: Subject<{}> = new Subject<{}>();
    private user: User;
    private coords: any;
    private adminEmails: any = ADMIN_EMAILS;

    constructor(private http: Http, private alertService: AlertService) { }

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
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getAll users');
                return Observable.throw(error || 'Error getAll users');
            });
    }

    public getById(id: any) {
        return this.http.get('/api/users/' + id, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error getById users');
                return Observable.throw(error || 'Error getById users');
            });
    }

    public create(userData: any) {
        this.user = {
            id: userData.id,
            password: userData.password || '',
            username: userData.firstName + userData.lastName || '',
            type: this.isAdmin(userData) ? 'admin' : 'default',
            email: userData.email,
            registrationType: userData.registrationType,
            registrationTime: new Date(),
            image: userData.image,
            location: this.coords
        };

        return this.http.post('http://localhost:9999/api/signup', this.user)
            .map((response: Response) => {
                console.log(response);
                if (response.status === 200) {
                    this.subject.next(status);
                }
                return response;
            })
            .catch((error: any) => {
                this.alertService.error(error || 'Error create users');
                return Observable.throw(error || 'Error create users');
            });
    }

    public registerationSuccess(): Observable<{}> {
        return this.subject.asObservable();
    }

    public update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error update users');
                return Observable.throw(error || 'Error update users');
            });
    }

    public delete(id: any) {
        return this.http.delete('/api/users/' + id, this.jwt())
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error delete users');
                return Observable.throw(error || 'Error delete users');
            });
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
