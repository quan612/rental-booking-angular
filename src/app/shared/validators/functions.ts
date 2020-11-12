import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';

export const emailValidator = (email: string): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value === email
      ? { forbiddenEmail: { value: control.value } }
      : null;
};

export const matchValidator = (controls: string[]): ValidatorFn => {
  return (control: FormGroup): ValidationErrors | null => {
    const thisVal = control.get(controls[0])?.value;
    const thatVal = control.get(controls[1])?.value;

    return thisVal !== thatVal
      ? { matchValidator: { value: control.value } }
      : null;
  };
};
