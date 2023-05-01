import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBeforeEnd', async: true })
export class IsBeforeEndValidator implements ValidatorConstraintInterface {
  validate(startTime: Date, args: ValidationArguments) {
    return startTime < args.object[args.constraints[0]];
  }

  defaultMessage() {
    return 'Start date must be before end date';
  }
}
