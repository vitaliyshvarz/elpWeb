import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// CORE components
import { WorkingHoursComponent } from './core/components/working-hours/working-hours.component';
import { PaymentOptionsComponent } from './core/components/payment-options/payment-options.component';
import { CurrencySelectorComponent } from './core/components/currency-selector/currency-selector.component';
import { DishesSelectorComponent } from './core/components/dishes-selector/dishes-selector.component';
import { AlertComponent } from './core/components/alert/alert.component';

// ADMIN components
import { AdminHomeComponent } from './admin/components/home/admin-home.component';
import { PlaceDetailComponent } from './admin/components/place/place-detail.component';
import { UserDetailComponent } from './admin/components/user/user-detail.component';
import { MealDetailComponent } from './admin/components/meal/meal-detail.component';
import { PlacesComponent } from './admin/components/places/places.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { SearchComponent } from './admin/components/search/search.component';
import { MainAdminComponent }  from './admin/components/main/admin-main.component';
import { AdminTopMenuComponent }  from './admin/components/admin-top-menu/admin-top-menu.component';
import { AddMealComponent } from './admin/components/add-meal/add-meal.component';
import { AddUserComponent }        from './admin/components/add-user/add-user.component';

// WEB components
import { AppComponent }  from './web/components/main/main.component';
import { WebHomeComponent } from './web/components/home/home.component';
import { TopMenuComponent } from './web/components/top-menu/top-menu.component';
import { TranslationsListComponent } from './web/components/translations-list/translations-list.component';
import { WebLoginFormComponent } from './web/components/login-form/login-form.component';
import { WebRegisterFormComponent } from './web/components/register-form/register-form.component';
import { WebLoginRegisterComponent } from './web/components/login-register/login-register.component';
import { FacebookLoginComponent } from './web/components/facebooklogin/facebooklogin.component';
import { GoogleLoginComponent } from './web/components/googlelogin/googlelogin.component';
import { FooterComponent } from './web/components/footer/footer.component';
import { QuickContactFormComponent } from './web/components/quick-contact-form/quick-contact-form.component';
import { JoinUsPageComponent } from './web/components/join-us-page/join-us-page.component';
import { AddPlacePart1Component } from './web/components/add-place/add-place-part1.component';
import { AddPlacePart2Component } from './web/components/add-place/add-place-part2.component';
import { AddPlacePart3Component } from './web/components/add-place/add-place-part3.component';
import { AboutUsComponent } from './web/components/about-us/about-us.component';
import { ContactPageComponent }       from './web/components/contact-page/contact-page.component';
import { RecoverPasswordComponent } from './web/components/recover-password/recover-password.component';

// Shared Modules
import {
    AuthenticationService,
    PlaceService,
    UserService,
    MealService,
    LoggedService,
    CommunicationService,
    UploadService,
    TRANSLATION_PROVIDERS,
    TranslatePipe,
    TranslateService,
    AuthGuard,
    AdminGuard,
    AlertService } from './core/@core';


import { AppRoutingModule }     from './app-routing.module';

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
        UserDetailComponent,
        MealDetailComponent,
        PlacesComponent,
        DashboardComponent,
        SearchComponent,
        MainAdminComponent,
        WebHomeComponent,
        WebLoginFormComponent,
        WebRegisterFormComponent,
        WebLoginRegisterComponent,
        AlertComponent,
        FacebookLoginComponent,
        GoogleLoginComponent,
        FooterComponent,
        QuickContactFormComponent,
        JoinUsPageComponent,
        AddPlacePart1Component,
        AddPlacePart2Component,
        AddPlacePart3Component,
        AboutUsComponent,
        ContactPageComponent,
        AdminTopMenuComponent,
        WorkingHoursComponent,
        PaymentOptionsComponent,
        CurrencySelectorComponent,
        DishesSelectorComponent,
        RecoverPasswordComponent,
        AdminHomeComponent,
        AddMealComponent,
        AddUserComponent
    ],
    providers: [
        AuthGuard,
        AdminGuard,
        PlaceService,
        TRANSLATION_PROVIDERS,
        TranslateService,
        UserService,
        MealService,
        AlertService,
        AuthenticationService,
        LoggedService,
        CommunicationService,
        UploadService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
