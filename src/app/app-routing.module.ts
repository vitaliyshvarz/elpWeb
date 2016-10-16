import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './admin/components/dashboard/dashboard.component';
import { HeroesComponent }      from './admin/components/heroes/heroes.component';
import { HeroDetailComponent }  from './admin/components/hero/hero-detail.component';
import { MainAdminComponent } from './admin/components/main/admin-main.component';
import { WebHomeComponent } from './web/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: WebHomeComponent },
  { path: 'admin',  component: MainAdminComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
