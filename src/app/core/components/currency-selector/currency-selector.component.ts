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
    private currencies: any = JSON.parse(JSON.stringify(CURRENCIES));
    @Input('data') data: any;

    selectCurrency(currency: any): void {
        this.data.name = currency.name;
        this.data.postfix = currency.postfix;
    }

    isCurrentCurrency(currency: any) {
        return this.currentCurrency.name === currency.name;
    }

    ngOnInit() {
        this.currentCurrency = this.currencies.find((cur: any) =>
            cur.name === this.data.name);
    }
}
