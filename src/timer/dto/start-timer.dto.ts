import { PickType } from '@nestjs/mapped-types';
import { Timer } from '../entities/timer.entity';

export class StartTimerDto extends PickType(Timer, ['title']) {}
