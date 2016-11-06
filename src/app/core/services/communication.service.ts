import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';
import { QuickEmail }     from '../models/quick-email';

@Injectable()

export class CommunicationService {

    constructor(private http: Http) { }

    sendQuickEmail(email: QuickEmail): Observable<QuickEmail[]> {
        return this.http.post(`/api/quick-email`, email)
            .map((response: Response) => response.json());
    }
}
