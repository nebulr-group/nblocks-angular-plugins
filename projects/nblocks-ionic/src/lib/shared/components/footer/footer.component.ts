import { Component, OnInit } from '@angular/core';
import { NBlocksLibService } from '../../../nblocks-lib.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'nblocks-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    readonly authService: AuthService,
    readonly nblocksLibService: NBlocksLibService
    ) { }

  ngOnInit(): void {
  }

}
