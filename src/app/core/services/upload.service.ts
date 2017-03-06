import { Injectable }                              from '@angular/core';
import { Http, Response }                          from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { AlertService }                            from '../services/alert.service';


@Injectable()

export class UploadService {

    progress: any;
    progress$: any;
    progressObserver: any;
    constructor(private http: Http, private alertService: AlertService) {
        this.progress$ = Observable.create((observer: any) => {
            this.progressObserver = observer;
        }).share();
    }

    uploadImage(params: string[], files: File[]) {
        let formData: FormData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('uploads[]', files[i], files[i].name);
        }

        return this.http.post(`/api/upload-file`, formData)
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.alertService.error(error || 'Error upload-file');
                return Observable.throw(error || 'Error upload-file');
            });
    }
}
