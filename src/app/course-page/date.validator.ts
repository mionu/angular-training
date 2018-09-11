import { AbstractControl, ValidationErrors } from "@angular/forms";
import * as moment from 'moment';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const date = moment(control.value, 'DD/MM/YYYY', true);
  return date.isValid() ? null : { error: 'wrong date format' };
}
