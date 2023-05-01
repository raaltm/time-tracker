import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timer } from '../../timer/entities/timer.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @OneToMany(() => Timer, (timer) => timer.user)
  timers: Timer[];
}
