import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessControlDirective } from './access-control.directive';



@NgModule({
  declarations: [
    AccessControlDirective
  ],
  exports: [
    AccessControlDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedDirectivesModule { }
