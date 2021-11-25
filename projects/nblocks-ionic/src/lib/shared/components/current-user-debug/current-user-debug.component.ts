import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'nblocks-current-user-debug',
  templateUrl: './current-user-debug.component.html',
  styleUrls: ['./current-user-debug.component.css']
})
export class CurrentUserDebugComponent implements OnInit {

  constructor(
    readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
