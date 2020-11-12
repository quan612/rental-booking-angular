import { Directive, Input } from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { emailValidator, matchValidator } from '../validators/functions';

@Directive({
  selector: '[forbiddenEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenEmailDirective,
      multi: true,
    },
  ],
})
export class ForbiddenEmailDirective implements Validator {
  @Input('forbiddenEmail') forbiddenEmail: string;

  validate = (control: AbstractControl): { [key: string]: any } | null => {
    return this.forbiddenEmail
      ? emailValidator(this.forbiddenEmail)(control)
      : null;
  };
}

@Directive({
  selector: '[matchValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchValidatorDirective,
      multi: true,
    },
  ],
})
export class MatchValidatorDirective implements Validator {
  @Input('matchValidator') controls: string[];

  validate = (control: FormGroup): ValidationErrors | null => {
    return this.controls && this.controls.length === 2
      ? matchValidator(this.controls)(control)
      : null;
  };
}
