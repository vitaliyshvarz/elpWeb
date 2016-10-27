import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { DashboardComponent }    from './admin/components/dashboard/dashboard.component';
import { PlacesComponent }       from './admin/components/places/places.component';
import { PlaceDetailComponent }  from './admin/components/place/place-detail.component';
import { MainAdminComponent }    from './admin/components/main/admin-main.component';
import { WebHomeComponent }      from './web/components/home/home.component';
import { WebLoginComponent }     from './web/components/login/login.component';
import { WebRegisterComponent }  from './web/components/register/register.component';
import { AuthGuard }             from  '@core';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: WebLoginComponent},
  { path: 'register', component: WebRegisterComponent},
  { path: 'home',  component: WebHomeComponent },
  { path: 'admin',  component: MainAdminComponent, canActivate: [AuthGuard] },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: PlaceDetailComponent, canActivate: [AuthGuard] },
  { path: 'places',     component: PlacesComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
