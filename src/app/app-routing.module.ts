import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WifiPageComponent } from './pages/wifi-page/wifi-page.component';
import { SerialPageComponent } from './pages/serial-page/serial-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: SerialPageComponent},
  {path: 'main-page', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: 'wifi-setup', component: WifiPageComponent},
  {path: 'welcome', component: WelcomePageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
