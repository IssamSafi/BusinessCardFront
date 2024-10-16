import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';
import { AppRoutingModule } from './app-routing.module';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { RouterModule,Routes } from '@angular/router';
import { Router } from 'express';
import path from 'path';





@NgModule({
  declarations: [
    AppComponent,
    AddBusinessCardComponent,
    BusinessCardListComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    FormsModule,
    RouterModule,
    AppRoutingModule,
    
      
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
