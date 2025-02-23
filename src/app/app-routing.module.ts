import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './demo1/purchase.component';
import { MonitorComponent } from './demo2/monitor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'purchase' },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'monitor', component: MonitorComponent },

  { path: '**', redirectTo: 'monitor' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
