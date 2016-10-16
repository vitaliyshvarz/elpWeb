import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// ADMIN
import { PlaceDetailComponent } from './admin/components/place/place-detail.component';
import { PlacesComponent } from './admin/components/places/places.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component'
import { PlaceSearchComponent } from './admin/components/place-search/place-search.component';
import { MainAdminComponent }  from './admin/components/main/admin-main.component';

import { PlaceService } from './admin/services/place.service';

// WEB
import { AppComponent }  from './web/components/main/main.component';
import { WebHomeComponent } from './web/components/home/home.component';

// Shared Modules
import { AppRoutingModule }     from './app-routing.module';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate/index';


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
    PlaceDetailComponent,
    PlacesComponent,
    DashboardComponent,
    PlaceSearchComponent,
    MainAdminComponent,
    WebHomeComponent,
    TranslatePipe
  ],
  providers: [ PlaceService, TRANSLATION_PROVIDERS, TranslateService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
