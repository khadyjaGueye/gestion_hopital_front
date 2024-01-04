import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { MedecinComponent } from './medecin/medecin.component';
import { authGuardGuard } from './guard/auth-guard.guard';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: "login", component: AuthentificationComponent },
  { path: "", component: AuthentificationComponent },
  {
    path: "medecin",
    component: MedecinComponent,
    canActivate:[authGuardGuard],
  },
  {
    path: "admin",
    component : AdminComponent,
    canActivate : [authGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
