import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { DashboardComponent }         from './admin/components/dashboard/dashboard.component';
import { PlacesComponent }            from './admin/components/places/places.component';
import { PlaceDetailComponent }       from './admin/components/place/place-detail.component';
import { UserDetailComponent }       from './admin/components/user/user-detail.component';
import { MainAdminComponent }         from './admin/components/main/admin-main.component';
import { WebHomeComponent }           from './web/components/home/home.component';
import { WebLoginRegisterComponent }  from './web/components/login-register/login-register.component';
import { JoinUsPageComponent }        from './web/components/join-us-page/join-us-page.component';
import { AboutUsComponent }           from './web/components/about-us/about-us.component';
import { ContactPageComponent }       from './web/components/contact-page/contact-page.component';

import { AuthGuard }                  from './core/@core';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: WebHomeComponent },
    { path: 'about-us', component: AboutUsComponent }
    { path: 'join-us/:part', component: JoinUsPageComponent },
    { path: 'login-register', component: WebLoginRegisterComponent },
    { path: 'contact', component: ContactPageComponent },
    {
        path: 'admin', component: MainAdminComponent, canActivate: [AuthGuard],

        children: [
            { path: 'home', component: '' },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'place-detail/:id', component: PlaceDetailComponent, canActivate: [AuthGuard] },
            { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
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
