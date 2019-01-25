import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/module/shared.module';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ErrorComponent
  },
  {
    path: ':code',
    data: { isDetail: true },
    component: ErrorComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
