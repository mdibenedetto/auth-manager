
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { EventsComponent } from './pages/events/events.component';
import { SpecialEventsComponent } from './pages/special-events/special-events.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    canActivate: [AuthGuard],
    component: SpecialEventsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }