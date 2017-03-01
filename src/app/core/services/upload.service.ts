import { Injectable }                              from '@angular/core';
import { Http, Response }                          from '@angular/http';
import { Observable }                              from 'rxjs/Rx';


@Injectable()

export class UploadService {
    // TODO: rewrite this awfull service
    // backendUrl: string = 'http://localhost:8182/upload';
    progress: any;
    progress$: any;
    progressObserver: any;
    constructor(private http: Http) {
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
            .map((response: Response) => response.json());
    }
}
