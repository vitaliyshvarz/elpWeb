import { Component, OnInit, Input } from '@angular/core';
import { DISHES } from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'dishes-selector',
    templateUrl: 'dishes-selector.component.html',
    styleUrls: ['dishes-selector.component.css']
})

export class DishesSelectorComponent implements OnInit {

    private dishes: any;
    private currentCurrency: any;
    @Input('dishes') dishesData: any;
    @Input('currency') currency: any;

    constructor() { }


    toogleDetails(id) {
        $(`#${id}details`).slideToggle('slow');
    }

    ngOnInit() {
        this.currentCurrency = this.currency;
        this.dishes = this.dishesData || JSON.parse(JSON.stringify(DISHES));
    }


}
