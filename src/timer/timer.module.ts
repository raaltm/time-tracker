import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timer } from './entities/timer.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timer]),
    UsersModule,
  ],
  controllers: [TimerController],
  providers: [TimerService],
})
export class TimerModule {}
