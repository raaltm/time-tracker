import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Timer {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @Column('datetime')
  startTime: Date = new Date();

  @Column({
    type: 'datetime',
    nullable: true,
  })
  endTime: Date | null = null;

  @ManyToOne(() => User, (user) => user.timers)
  user: User;
}
