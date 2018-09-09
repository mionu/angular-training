import { FormControl } from "@angular/forms";
import * as moment from 'moment';

export function dateValidator(c: FormControl) {
  const date = moment(c.value, 'DD/MM/YYYY', true);
  return date.isValid() ? null : { error: 'wrong date format' };
}
