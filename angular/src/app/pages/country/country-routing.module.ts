import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import {AuthGuard} from "../../guards/auth.guard";
import {AdminGuard} from "../../guards/admin.guard";
import {AdminLayoutComponent} from "../../shared/layouts/admin/admin.layout.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      { path: 'list', component: ListComponent},
      { path: ':id/detail', component:ViewComponent },
      { path: '',  redirectTo: 'list', pathMatch: 'full'},
      { path: ':id/edit', component: EditComponent, canActivate: [AdminGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
