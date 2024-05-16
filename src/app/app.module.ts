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
import { DataTablesModule } from 'angular-datatables';
import { OrdonnanceComponent } from './medecin/ordonnance/ordonnance.component';
import { CalendrierComponent } from './medecin/calendrier/calendrier.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    MedecinComponent,
    ListeComponent,
    AuthentificationComponent,
    AdminComponent,
    ListeAdminComponent,
    ListServiceComponent,
    OrdonnanceComponent,
    CalendrierComponent
  ],
  imports: [
    NgxPrintModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    DataTablesModule,
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
