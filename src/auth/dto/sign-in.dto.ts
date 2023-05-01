import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class SignInDto extends PickType(User, ['username', 'password']) {}
