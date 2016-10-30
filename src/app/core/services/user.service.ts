import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  public getAll() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  }

  public getById(id) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  public create(user) {
    return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
  }

  public update(user) {
    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  public elete(id) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
