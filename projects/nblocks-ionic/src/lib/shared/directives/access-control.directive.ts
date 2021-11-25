import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Directive({
  selector: '[nblocksAccessControl]'
})
export class AccessControlDirective implements OnInit {

  @Input() nblocksAccessControl!: string[];
  @Input() roles!: string[];

  constructor(
    private readonly elementRef: ElementRef,
    private readonly authService: AuthService
    ) { }
  
  ngOnInit(): void {
    console.log("this.nblocksAccessControl", this.nblocksAccessControl);
    this.hide();
    this.authService.currentUser$.subscribe((currentUser) => {
      if (currentUser.authenticated && currentUser.hasRole(this.nblocksAccessControl)) {
        this.show();
      } else {
        this.hide();
      }
    })
  }

  private hide(): void {
    this.elementRef.nativeElement.hidden = true;
  }

  private show(): void {
    this.elementRef.nativeElement.hidden = false;
  }

}
