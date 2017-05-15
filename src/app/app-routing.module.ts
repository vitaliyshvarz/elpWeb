import { NgModule }                   from '@angular/core';
import { RouterModule }       from '@angular/router';
import { DashboardComponent }         from './admin/components/dashboard/dashboard.component';
import { PlacesComponent }            from './admin/components/places/places.component';
import { PlaceDetailComponent }       from './admin/components/place/place-detail.component';
import { UserDetailComponent }       from './admin/components/user/user-detail.component';
import { MealDetailComponent }       from './admin/components/meal/meal-detail.component';
import { MainAdminComponent }         from './admin/components/main/admin-main.component';
import { WebHomeComponent }           from './web/components/home/home.component';
import { WebLoginRegisterComponent }  from './web/components/login-register/login-register.component';
import { JoinUsPageComponent }        from './web/components/join-us-page/join-us-page.component';
import { AboutUsComponent }           from './web/components/about-us/about-us.component';
import { ContactPageComponent }       from './web/components/contact-page/contact-page.component';
import { AdminHomeComponent }         from './admin/components/home/admin-home.component';
import { AddMealComponent }        from './admin/components/add-meal/add-meal.component';
import { AddUserComponent }        from './admin/components/add-user/add-user.component';

import { AuthGuard }                  from './core/@core';
import { AdminGuard }                  from './core/@core';

const routes: any = [
    { path: '', component: WebHomeComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'join-us/:part', component: JoinUsPageComponent },
    { path: 'login-register', component: WebLoginRegisterComponent },
    { path: 'login-register/:add-place', component: WebLoginRegisterComponent },
    { path: 'contact', component: ContactPageComponent },
    {
        path: 'admin', component: MainAdminComponent, canActivate: [AuthGuard],

        children: [
            { path: 'home', component: AdminHomeComponent, canActivate: [AuthGuard] },
            { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: 'add-meal', component: AddMealComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: 'place-detail/:id', component: PlaceDetailComponent, canActivate: [AuthGuard] },
            { path: 'meal-detail/:id', component: MealDetailComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard, AdminGuard] },
            { path: 'my-places', component: PlacesComponent, canActivate: [AuthGuard] }
        ]

    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
