import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './demo1/purchase.component';
import { MonitorComponent } from './demo2/monitor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchadenfallComponent } from './demo3/schadenfall.component';
import { CompainSDKComponent } from './demo4/compain-SDK.component';
import { CesiumViewerComponent } from './demo5/cesium-viewer/cesium-viewer.component';
import { HighlightViewerComponent } from './demo6/highlight-viewer/highlight-viewer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'monitor', component: MonitorComponent },
      { path: 'schadenfall', component: SchadenfallComponent },
      { path: 'insurance', component: CompainSDKComponent },
      { path: 'cesium', component: CesiumViewerComponent },
      { path: 'highlightViewer', component: HighlightViewerComponent },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
