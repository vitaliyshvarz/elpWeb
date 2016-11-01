import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';
import { DashboardComponent }         from './admin/components/dashboard/dashboard.component';
import { PlacesComponent }            from './admin/components/places/places.component';
import { PlaceDetailComponent }       from './admin/components/place/place-detail.component';
import { MainAdminComponent }         from './admin/components/main/admin-main.component';
import { WebHomeComponent }           from './web/components/home/home.component';
import { WebLoginRegisterComponent }  from './web/components/login-register/login-register.component';
import { AuthGuard }                  from './core/@core';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: WebHomeComponent },
    { path: 'login-register', component: WebLoginRegisterComponent },
    { path: 'admin', component: MainAdminComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: PlaceDetailComponent, canActivate: [AuthGuard] },
    { path: 'places', component: PlacesComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
