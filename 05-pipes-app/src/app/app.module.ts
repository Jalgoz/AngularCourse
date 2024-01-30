import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { SharedModule } from './shared/shared.module';

// Locale app configuration
import localeEsHN from '@angular/common/locales/es-HN';
import localeFrCA from '@angular/common/locales/fr-CA';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsHN, 'es-HN');
registerLocaleData(localeFrCA, 'fr-CA');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: 'LOCALE_ID', useValue: 'es-HN' }, // To stablish the locale app
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
