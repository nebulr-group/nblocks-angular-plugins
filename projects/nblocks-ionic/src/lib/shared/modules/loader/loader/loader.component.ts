import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { Loader } from '../loader.model';

@Component({
  selector: 'nblocks-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  public show: boolean = false;

  constructor(private loaderService: LoaderService) { }

  public ngOnInit(): void {
    this.loaderService.loaderStatus$.subscribe((response: Loader) => {
      this.show = response.status;
    });
  }
}