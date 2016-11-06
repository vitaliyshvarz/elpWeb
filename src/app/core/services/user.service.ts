import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    private subject: Subject<{}> = new Subject<{}>();

    constructor(private http: Http) { }

    public getAll() {
        return this.http.get('/api/users', this.jwt())
            .map((response: Response) => response.json());
    }

    public getById(id: any) {
        return this.http.get('/api/users/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    public create(user: any) {
        return this.http.post('/api/users', user, this.jwt())
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

    public update(user: any) {
        return this.http.put('/api/users/' + user.id, user, this.jwt())
            .map((response: Response) => response.json());
    }

    public delete(id: any) {
        return this.http.delete('/api/users/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        const userData: any = localStorage.getItem('currentUser') || {};
        let currentUser = !!userData.firsName ? JSON.parse(userData) : null;
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
