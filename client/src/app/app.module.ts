import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventsComponent } from './pages/events/events.component';
import { SpecialEventsComponent } from './pages/special-events/special-events.component';
import { AuthService } from './services/auth.service';
import { EventService } from './services/event.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    EventsComponent,
    SpecialEventsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService,AuthGuard, EventService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }], 
  bootstrap: [AppComponent]
})
export class AppModule { }
