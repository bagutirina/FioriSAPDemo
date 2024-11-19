import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule, FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FormsModule } from '@angular/forms'; // Importă FormsModule
import { TruncateModule } from '@fundamental-ngx/core';
import { FilterPipe } from './filter.pipe';
import { SortByPipe } from './sort.pipe';




@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FundamentalNgxCoreModule,
    ButtonModule,
    TruncateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
