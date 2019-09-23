import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PoliticalNDADashBoardComponent } from './political-nda-dash-board/political-nda-dash-board.component';
import { OrganisationIbmDashboardComponent } from './organisation-ibm-dashboard/organisation-ibm-dashboard.component'
import { AuthGuard } from './auth.guard'
import { ComponentsComponent } from './components/components.component'
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

import { from } from 'rxjs';
const routes: Routes = [
  { path: 'home', component: ComponentsComponent },

  {
    path: 'political', component: PoliticalNDADashBoardComponent,// canActivate: [AuthGuard]
  },
  {
    path: 'organisation', component: OrganisationIbmDashboardComponent, //canActivate: [AuthGuard]
  },
  {path:'login',component:LoginComponent},
  { path: 'home', component: ComponentsComponent },
  // { path: 'user-profile', component: ProfileComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'landing', component: LandingComponent },
  // { path: 'nucleoicons', component: NucleoiconsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
