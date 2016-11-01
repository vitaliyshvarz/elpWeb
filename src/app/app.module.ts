import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// ADMIN
import { PlaceDetailComponent } from './admin/components/place/place-detail.component';
import { PlacesComponent } from './admin/components/places/places.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { PlaceSearchComponent } from './admin/components/place-search/place-search.component';
import { MainAdminComponent }  from './admin/components/main/admin-main.component';

// WEB
import { AppComponent }  from './web/components/main/main.component';
import { WebHomeComponent } from './web/components/home/home.component';
import { TopMenuComponent } from './web/components/top-menu/top-menu.component';
import { TranslationsListComponent } from './web/components/translations-list/translations-list.component';
import { WebLoginFormComponent } from './web/components/login-form/login-form.component';
import { WebRegisterFormComponent } from './web/components/register-form/register-form.component';
import { WebLoginRegisterComponent } from './web/components/login-register/login-register.component';
import { AlertComponent } from './web/components/alert/alert.component';

import { AlertService } from './web/services/alert.service';

// Shared Modules
import { AuthenticationService } from './core/@core';
import { PlaceService } from './core/@core';
import { UserService } from './core/@core';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './core/@core';
import { AppRoutingModule }     from './app-routing.module';

import { AuthGuard } from './core/@core';

// used to create fake backend
import { fakeBackendProvider } from './core/@core';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import './rxjs-extensions';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
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
        WebLoginFormComponent,
        WebRegisterFormComponent,
        WebLoginRegisterComponent,
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
    bootstrap: [AppComponent]
})
export class AppModule { }
