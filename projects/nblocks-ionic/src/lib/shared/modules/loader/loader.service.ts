import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loader } from './loader.model';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader = new BehaviorSubject<Loader>({ status: false });

  loaderStatus$ = this.loader.asObservable();

  constructor() { }

  public showLoader(): void {
    this.loader.next({ status: true });
  }

  public hideLoader(): void {
    this.loader.next({ status: false });
  }
}
