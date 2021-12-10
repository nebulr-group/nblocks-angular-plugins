import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';


/**
 * This module helps library to pack required dependencies like @angular/cdk (DropdownModule)
 * Its unclear if below modules are needed in NblocksIonicModule
 * BrowserModule
 * BrowserAnimationsModule
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DropdownModule,
    TableModule
  ]
})
export class PrimengModule { }
