import { Injectable } from '@nestjs/common';
import { StartTimerDto } from './dto/start-timer.dto';
import { EndTimerDto } from './dto/end-timer.dto';
import { User } from '../users/entities/user.entity';
import { Timer } from './entities/timer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Repository } from 'typeorm';
import { UpdateTimerDto } from './dto/update-timer.dto';

@Injectable()
export class TimerService {
  constructor(
    @InjectRepository(Timer)
    private timerRepository: Repository<Timer>,
  ) {}
  start(user: User, startTimerDto: StartTimerDto): Promise<Timer> {
    const timer = new Timer();
    timer.title = startTimerDto.title;
    timer.user = user;
    return this.timerRepository.save(timer);
  }

  stop(timer: Timer): Promise<Timer> {
    timer.endTime = new Date();
    return this.timerRepository.save(timer);
  }

  findOneByUserAndId(user: User, id: number) {
    return this.timerRepository.findOneBy({
      user: user,
      id: id,
    });
  }

  findOne(id: number) {
    return this.timerRepository.findOneBy({ id: id });
  }

  findOpenTimerByUser(user: User): Promise<Timer | null> {
    return this.timerRepository.findOne({
      where: {
        user: user,
        endTime: IsNull(),
      },
    });
  }

  findAllByUserAndTitle(
    user: User,
    title: string | undefined,
  ): Promise<Timer[] | null> {
    const where = {
      user: user,
      title: null,
    };
    if (title !== undefined) {
      where.title = Like(`%${title}%`);
    }
    return this.timerRepository.find({
      where: where,
      order: { startTime: 'DESC' },
    });
  }

  findAllByUserAndSumDuration(user: User): Promise<{ sum: string } | null> {
    return this.timerRepository
      .createQueryBuilder('timer')
      .select('sum(endTime - startTime) as sum')
      .where('timer.userId = :userId', { userId: user.id })
      .getRawOne();
  }

  update(timer: Timer, updateTimerDto: UpdateTimerDto) {
    timer.startTime =
      updateTimerDto.startTime !== null
        ? updateTimerDto.startTime
        : timer.startTime;
    timer.endTime =
      updateTimerDto.endTime !== null ? updateTimerDto.endTime : timer.endTime;
    timer.title =
      updateTimerDto.title !== null ? updateTimerDto.title : timer.title;

    return this.timerRepository.save(timer);
  }
}
