import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@shared/components/header/header.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { MaterialModule } from '@app/material.module';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminInterceptor } from '@shared/interceptors/admin-interceptor';
import { FormInterceptor } from '@shared/interceptors/form-interceptor';
import { PassInterceptor } from '@shared/interceptors/pass-interceptor';
import { DomiInterceptor } from '@shared/interceptors/domi-interceptor';
import { MenorInterceptor } from '@shared/interceptors/menor-interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FormInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PassInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DomiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MenorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
