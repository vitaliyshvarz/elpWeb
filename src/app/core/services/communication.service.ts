import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { QuickEmail }     from '../models/quick-email';
import { Email }          from '../models/email';
import { Observable }     from 'rxjs/Observable';
import { AlertService }   from '../services/alert.service';



@Injectable()

export class CommunicationService {

    constructor(private http: Http, private alertService: AlertService) { }

    sendQuickEmail(email: QuickEmail): Observable<QuickEmail[]> {
        return this.http.post(`/api/quick-email`, email)
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error sendQuickEmail');
                return Observable.throw(error || 'Error sendQuickEmail');
            });
    }

    sendEmail(email: Email): Observable<Email[]> {
        return this.http.post(`/api/send-email`, email)
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error sendEmail');
                return Observable.throw(error || 'Error sendEmail');
            });
    }
}
