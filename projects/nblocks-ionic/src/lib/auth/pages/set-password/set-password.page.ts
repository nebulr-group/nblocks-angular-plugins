import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NBlocksLibService } from '../../../nblocks-lib.service';
import { ToastService } from '../../../shared/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'nblocks-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],
})
export class SetPasswordPage implements OnInit {
  loading = false;
  error = false;
  private token!: string;

  passwordForm:FormGroup;
  passwordStrengthKeys:string[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly navCtrl: NavController,
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService,
    private readonly nblocksLibService: NBlocksLibService
  ) {

    if (this.nblocksLibService.config.passwordComplexity || this.nblocksLibService.config.passwordComplexityRegex) {
      if (this.nblocksLibService.config.passwordComplexityRegex) {
        this.passwordForm = this.formBuilder.group({
          password: ['', [Validators.required, this.createPasswordCustomStrengthValidator(this.nblocksLibService.config.passwordComplexityRegex)]],
          password_repeat: ['', [Validators.required, this.samePasswordValidator]],
        });
        this.passwordStrengthKeys.push('passwordStrength_invalidCustomStrength');
      } else {
        this.passwordForm = this.formBuilder.group({
          password: ['', [Validators.required, this.passwordStandardStrengthValidator]],
          password_repeat: ['', [Validators.required, this.samePasswordValidator]],
        });
        this.passwordStrengthKeys.push(
          'passwordStrength_minLength',
          'passwordStrength_noUppercaseLetter',
          'passwordStrength_noLowercaseLetter',
          'passwordStrength_noNumber',
          'passwordStrength_noSpecialCharacter'
          )
      }
    } else {
      this.passwordForm = this.formBuilder.group({
        password: ['', [Validators.required]],
        password_repeat: ['', [Validators.required, this.samePasswordValidator]],
      });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.token = params.token;
    });
  }

  public async resetPassword(form: FormGroup): Promise<void> {
    const password = form.get('password')?.value;

    this.loading = true;
    this.error = false;
    this.authService.resetPassword(this.token, password).subscribe(
    res => {
      this.loading = false;
      this.toastService.presentMessage(["PASSWORD_RESETTED"]);
      this.navCtrl.navigateForward('auth/login');
    }, err => {
      this.loading = false;
      this.error = true;
    });
  }

  public async handleKeyUp(e: KeyboardEvent, form: FormGroup): Promise<void> {
    if (e.key === 'Enter' && form.valid) {
      this.resetPassword(form);
    }
  }

  // StrengthValidator using custom regex
  createPasswordCustomStrengthValidator(regex: RegExp): unknown {
    const validator:ValidationErrors | null = (control: AbstractControl) =>  {
      const value: string = control.value || '';
  
      if (!value) {
        return null;
      }
  
      const errors: ValidationErrors = {};
  
      if (regex.test(value) === false) {
        errors.passwordStrength = true;
        errors.passwordStrength_invalidCustomStrength = true;
      }
  
      if (errors.passwordStrength) {
        return errors;
      }
  
      return null;
    };

    return validator;
  }

  // Built in ISO 27001 strength
  passwordStandardStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';

    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    
    if (value.length < 10) {
      errors.passwordStrength = true;
      errors.passwordStrength_minLength = true;
    }

    const upperCaseCharacters = /[A-Z]+/g;
    if (upperCaseCharacters.test(value) === false) {
      errors.passwordStrength = true;
      errors.passwordStrength_noUppercaseLetter = true;
    }

    const lowerCaseCharacters = /[a-z]+/g;
    if (lowerCaseCharacters.test(value) === false) {
      errors.passwordStrength = true;
      errors.passwordStrength_noLowercaseLetter = true;
    }

    const numberCharacters = /[0-9]+/g;
    if (numberCharacters.test(value) === false) {
      errors.passwordStrength = true;
      errors.passwordStrength_noNumber = true;
    }

    const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (specialCharacters.test(value) === false) {
      errors.passwordStrength = true;
      errors.passwordStrength_noSpecialCharacter = true;
    }

    if (errors.passwordStrength) {
      return errors;
    }

    return null;
  }

  samePasswordValidator(control: AbstractControl): ValidationErrors | undefined {
    if (!control.parent) {
      return undefined;
    }

    const password = control.parent.get('password')?.value;
    if (password !== control.value) {
      return { passwordsDontMatch: true };
    }

    return undefined;
  }
}
