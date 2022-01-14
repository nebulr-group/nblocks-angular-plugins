import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader.service';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  providers: [LoaderService]
})
export class LoaderModule { }
