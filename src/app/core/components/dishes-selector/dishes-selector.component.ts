import { Component, OnInit, Input } from '@angular/core';

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
    @Input('deleteMeals') deleteMeals: boolean;

    toogleDetails(id: string): void {
        $(`#${id}details`).slideToggle('slow');
    }

    ngOnInit() {
        this.currentCurrency = this.currency;
        this.dishes = this.dishesData;
    }

    removeMeal(id: string | number): void {
        this.dishes.splice(id, 1);
    }


}
