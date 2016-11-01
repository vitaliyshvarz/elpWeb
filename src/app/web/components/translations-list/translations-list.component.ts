import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'translations-list',
    templateUrl: 'translations-list.component.html',
    styleUrls: ['translations-list.component.css']
})

export class TranslationsListComponent implements OnInit {


    public translatedText: string;
    public supportedLangs: any[];
    public selectedLang: string;

    @Input('ul-class') ulClass: string;
    @Input('li-class') liClass: string;

    constructor(private _translate: TranslateService) { }

    ngOnInit() {
        // standing data
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Deutsch', value: 'de' }
        ];

        // set current langage
        this.selectLang('en');
        this.selectedLang = this._translate.currentLang;
    }

    isCurrentLang(lang: string) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set current lang;
        this._translate.use(lang);
        this.selectedLang = this._translate.currentLang;
    }

}
