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
import { UserService } from '@core';
import { AlertService } from './web/services/alert.service';
import { AuthenticationService } from '@core';

// WEB
import { AppComponent }  from './web/components/main/main.component';
import { WebHomeComponent } from './web/components/home/home.component';
import { TopMenuComponent } from './web/components/top-menu/top-menu.component';
import { TranslationsListComponent } from './web/components/translations-list/translations-list.component';
import { WebLoginComponent } from './web/components/login/login.component';
import { WebRegisterComponent } from './web/components/register/register.component';
import { AlertComponent } from './web/components/alert/alert.component'

// Shared Modules
import { AppRoutingModule }     from './app-routing.module';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './core/translate/index';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import { AuthGuard } from '@core';

// used to create fake backend
import { fakeBackendProvider } from '@core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

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
    TopMenuComponent,
    TranslationsListComponent,
    TranslatePipe,
    AppComponent,
    PlaceDetailComponent,
    PlacesComponent,
    DashboardComponent,
    PlaceSearchComponent,
    MainAdminComponent,
    WebHomeComponent,
    WebLoginComponent,
    WebRegisterComponent,
    AlertComponent
  ],
  providers: [
    AuthGuard,
    PlaceService,
    TRANSLATION_PROVIDERS,
    TranslateService,
    UserService,
    AlertService,
    AuthenticationService,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
