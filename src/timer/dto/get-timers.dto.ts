import { PartialType, PickType } from '@nestjs/mapped-types';
import { Timer } from '../entities/timer.entity';

export class GetTimersDto extends PartialType(PickType(Timer, ['title'])) {}
