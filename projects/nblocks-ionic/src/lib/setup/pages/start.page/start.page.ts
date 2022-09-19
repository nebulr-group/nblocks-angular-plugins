import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app/app.service';
import { App } from '../../../generated/graphql';

@Component({
  selector: 'nblocks-start.page',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.css']
})
export class StartPage implements OnInit {

  constructor(
    private readonly appService: AppService
  ) { }

  app?: App;

  ngOnInit(): void {
    this.appService.getAppAnonymous().subscribe(app => this.app = app);
  }

}
