import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ButtonModule,
  DialogModule,
  FundamentalNgxCoreModule,
  ProgressIndicatorModule,
} from '@fundamental-ngx/core';
import { FormsModule } from '@angular/forms'; // Importă FormsModule
import { TruncateModule } from '@fundamental-ngx/core';
import { FilterPipe } from './filter.pipe';
import { SortByPipe } from './sort.pipe';
import { PlatformSearchFieldModule } from '@fundamental-ngx/platform';
import { PurchaseComponent } from './demo1/purchase.component';
import { MonitorComponent } from './demo2/monitor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchadenfallComponent } from './demo3/schadenfall.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PurchaseComponent,
    MonitorComponent,
    SchadenfallComponent,
    FilterPipe,
    SortByPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FundamentalNgxCoreModule,
    ButtonModule,
    TruncateModule,
    PlatformSearchFieldModule,
    ProgressIndicatorModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
