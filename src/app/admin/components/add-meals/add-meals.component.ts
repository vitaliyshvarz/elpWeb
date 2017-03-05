import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { MealService, Meal}                  from '../../../core/@core';

@Component({
    moduleId: module.id,
    selector: 'add-meals',
    templateUrl: 'add-meals.component.html',
    styleUrls: ['add-meals.component.css']
})
export class AddMealsComponent implements OnInit, DoCheck {
    meals: Meal[];
    accordion: any;
    allMeals: Meal[];
    @Input('existingMeals') existingMeals: any;

    constructor(
        private mealService: MealService,
    ) { }


    ngDoCheck() {
        if (this.meals) {
            this.meals = this.filterSelected(this.allMeals);
        }
    }

    ngOnInit() {
        this.loadAllMeals();
        new (<any>Foundation.Accordion)($('#dishesAccordion'));
    }

    private loadAllMeals(): void {
        this.mealService.getAll()
            .subscribe((meals: Meal[]) => {
                this.allMeals = meals;
                this.meals = this.filterSelected(meals);
            });
    }

    private filterSelected(meals: Meal[]): Meal[] {
        const filteredMeals: Meal[] = [];
        meals.forEach((meal: Meal) => {
            let existing = this.existingMeals.find((exsMeal: Meal) =>
                exsMeal.id === meal.id);
            if (!existing) {
                filteredMeals.push(meal);
            }
        });

        return filteredMeals;
    }

    toogleItem(id: string, tabId: string): void {
        $(`#${id}`).toggle();
        $(`#${tabId}`).toggleClass('is-active');
    }

    addMeal(meal: Meal): void {
        meal.selected = true;
        this.existingMeals.push(meal);
        this.meals = this.filterSelected(this.meals);
    }

}
