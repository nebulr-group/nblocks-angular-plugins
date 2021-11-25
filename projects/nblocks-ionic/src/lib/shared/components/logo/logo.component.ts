import { Component, OnInit } from '@angular/core';
import { NBlocksLibService } from '../../../nblocks-lib.service';

@Component({
  selector: 'nblocks-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(
    readonly nblocksLibService: NBlocksLibService
  ) { }

  ngOnInit(): void {
  }

}
