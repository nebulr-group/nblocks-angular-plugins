import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeFullNamePipe } from './safe-full-name.pipe';

@NgModule({
  declarations: [
    SafeFullNamePipe
  ],
  exports: [
    SafeFullNamePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedPipesModule { }
