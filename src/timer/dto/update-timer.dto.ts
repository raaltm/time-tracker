import { Transform } from 'class-transformer';
import { IsDate, IsString, Validate } from 'class-validator';
import { IsBeforeEndValidator } from '../is-before-end-validator';

export class UpdateTimerDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @Validate(IsBeforeEndValidator, ['endTime'])
  startTime: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  endTime: Date;

  @IsString()
  title: string;
}
