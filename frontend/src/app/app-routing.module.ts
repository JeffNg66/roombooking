import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashComponent } from './component/bookMain/flash.component';
import { StoreFirstGuard } from './storeFirst.guard';
import { RegisterComponent } from './component/bookMain/register.component';

const routes: Routes = [
  {
    path: 'flash',
    component: FlashComponent,
    canActivate: [StoreFirstGuard]
  },      
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [StoreFirstGuard]
  },
  {
    path: 'book',
    loadChildren: './module/bookChildren.module#BookChildrenModule',
    canActivate: [StoreFirstGuard]
  },  
  { path: '**', redirectTo: '/flash' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
