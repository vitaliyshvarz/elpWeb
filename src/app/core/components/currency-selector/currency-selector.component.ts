import { Component, OnInit, Input } from '@angular/core';
import { CURRENCIES } from '../../@core';


@Component({
    moduleId: module.id,
    selector: 'currency-selector',
    templateUrl: 'currency-selector.component.html',
    styleUrls: ['currency-selector.component.css']
})

export class CurrencySelectorComponent implements OnInit {
    private currentCurrency: any; // USD
    private currencies: any = CURRENCIES;
    @Input('data') data: any;

    selectCurrency(currency) {
        this.data.name = currency.name;
        this.data.postfix = currency.postfix;

    }

    isCurrentCurrency(currency) {
        return this.currentCurrency.name === currency.name;
    }

    ngOnInit() {
        this.currentCurrency = this.currencies.find(cur => cur.name === this.data.name);
    }
}
