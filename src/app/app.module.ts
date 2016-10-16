import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// ADMIN
import { HeroDetailComponent } from './admin/components/hero/hero-detail.component';
import { HeroesComponent } from './admin/components/heroes/heroes.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component'
import { HeroSearchComponent } from './admin/components/hero-search/hero-search.component';
import { MainAdminComponent }  from './admin/components/main/admin-main.component';

import { HeroService } from './admin/services/hero.service';

// WEB

import { AppComponent }  from './web/components/main/main.component';
import { WebHomeComponent } from './web/components/home/home.component';

import { AppRoutingModule }     from './app-routing.module';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import './rxjs-extensions';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
 ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent,
    MainAdminComponent,
    WebHomeComponent
  ],
  providers: [ HeroService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
