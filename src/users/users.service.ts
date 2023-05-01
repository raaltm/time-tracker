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
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByName(username: string) {
    return this.usersRepository.findOneBy({ username: username });
  }

  update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
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

  remove(user: User): Promise<User> {
    return this.usersRepository.remove(user);
  }
}
