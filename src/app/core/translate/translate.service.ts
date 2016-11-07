import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TranslateService {
    private _currentLang: string;
    private subject: Subject<{}> = new Subject<{}>();

    public get currentLang() {
        return this._currentLang;
    }

    // inject our translations
    constructor( @Inject(TRANSLATIONS) private _translations: any) {
    }

    public getCurentLang() {
        return this.subject.asObservable();
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
        this.subject.next(lang);
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;

        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key);
    }
}
