import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveProductGroupComponent } from './reactive-product-group/reactive-product-group.component';


@NgModule({
  declarations: [
    AppComponent,
    ReactiveProductGroupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
