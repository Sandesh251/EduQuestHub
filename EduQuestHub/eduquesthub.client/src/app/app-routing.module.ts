import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/auth/auth.component';
import { HomeComponent } from 'src/auth/Pages/home/home.component';
import { AdminComponent } from 'src/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('../admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '' },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
