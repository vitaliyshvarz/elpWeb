import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Hero } from './hero';

import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    styleUrls: [ '../css/heroes.component.css' ],
    templateUrl: 'tpl/heroes.component.html',
      providers: [HeroService]

})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}
