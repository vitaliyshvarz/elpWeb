import { Injectable }                              from '@angular/core';
import { Http } from '@angular/http';
import { Observable }                              from 'rxjs/Rx';


@Injectable()

export class UploadService {
    // TODO: rewrite this awfull service
    backendUrl: string = 'http://localhost:8182/upload';
    progress: any;
    progress$: any;
    progressObserver: any;
    constructor(private http: Http) {
        this.progress$ = Observable.create((observer: any) => {
            this.progressObserver = observer;
        }).share();
    }

    uploadImage(params: string[], files: File[]) {
        return Observable.create((observer: any) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);

                this.progressObserver.next(this.progress);
            };

            xhr.open('POST', this.backendUrl, true);
            xhr.send(formData);
        });
    }
}
