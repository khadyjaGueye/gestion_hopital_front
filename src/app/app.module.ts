import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedecinComponent } from './medecin/medecin.component';
import { ListeComponent } from './medecin/liste/liste.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';
import { AdminComponent } from './admin/admin.component';
import { ListeAdminComponent } from './admin/liste-admin/liste-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListServiceComponent } from './admin/list-service/list-service.component';

@NgModule({
  declarations: [
    AppComponent,
    MedecinComponent,
    ListeComponent,
    AuthentificationComponent,
    AdminComponent,
    ListeAdminComponent,
    ListServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
