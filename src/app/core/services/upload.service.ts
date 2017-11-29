import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { AlertService }   from '../services/alert.service';
import { SessionService } from '../services/session.service';
import { BACKEND_API }    from '../config/backendConfig';

@Injectable()

export class UploadService {

    progress: any;
    progress$: any;
    progressObserver: any;
    constructor(
        private http: Http,
        private alertService: AlertService,
        private sessionService: SessionService
    ) {
        this.progress$ = Observable.create((observer: any) => {
            this.progressObserver = observer;
        }).share();
    }

    uploadImage(params: string[], fileList: File[]) {
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();

            formData.append('uploadFile', file, file.name);
            formData.append('extention', file.name.split('.').pop());

            let headers = new Headers();

            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');

            return this.http.post(BACKEND_API.uploadImage, formData, this.sessionService.addTokenHeader())
                .map(res => res.json())
                .catch(error => Observable.throw(error));
        }
    }
}
