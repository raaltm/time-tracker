import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  update(user: User, updateUserDto: UpdateUserDto) {
    user.username =
      updateUserDto.username !== undefined
        ? updateUserDto.username
        : user.username;
    user.password =
      updateUserDto.password !== undefined
        ? updateUserDto.password
        : user.password;
    return this.usersRepository.save(user);
  }

  remove(user: User) {
    return this.usersRepository.remove(user);
  }
}
