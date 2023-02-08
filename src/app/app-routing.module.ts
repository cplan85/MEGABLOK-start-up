import { WifiPageComponent } from './pages/wifi-page/wifi-page.component';
import { SerialPageComponent } from './pages/serial-page/serial-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: SerialPageComponent},
  {path: 'wifi-setup', component: WifiPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
