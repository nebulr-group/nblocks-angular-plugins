import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';


/**
 * This module helps library to pack required dependencies like @angular/cdk
 * Its unclear if below modules are needed in NblocksIonicModule
 * BrowserModule
 * BrowserAnimationsModule
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule
  ]
})
export class PrimengModule { }
