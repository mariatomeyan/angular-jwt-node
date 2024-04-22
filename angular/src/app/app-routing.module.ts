import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import {RedirectGuard} from "./guards/redirect.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
   {
    path: '',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login',  canActivate: [RedirectGuard],  loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
      { path: 'countries', loadChildren: () => import('./pages/country/country.module').then(m => m.CountryModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
