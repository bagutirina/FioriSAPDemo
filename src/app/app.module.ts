import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ButtonModule,
  DialogModule,
  FundamentalNgxCoreModule,
  IconModule,
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
import { CompainSDKComponent } from './demo4/compain-SDK.component';
import { HttpClientModule } from '@angular/common/http';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { CesiumViewerComponent } from './demo5/cesium-viewer/cesium-viewer.component';
import { HighlightViewerComponent } from './demo6/highlight-viewer/highlight-viewer.component';
import { DropImageDirective } from './directives/drop-image.directive';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PurchaseComponent,
    MonitorComponent,
    SchadenfallComponent,
    FilterPipe,
    SortByPipe,
    CompainSDKComponent,
    CesiumViewerComponent,
    HighlightViewerComponent,
    DropImageDirective,
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
    HttpClientModule,
    RadioModule,
    NgxTippyModule,
    IconModule,
    NgxExtendedPdfViewerModule,
    NgxDocViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
