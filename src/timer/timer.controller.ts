import { Body, Controller, Get, Param, Patch, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { TimerService } from './timer.service';
import { StartTimerDto } from './dto/start-timer.dto';
import { UsersService } from '../users/users.service';
import { AuthRequest } from '../auth/AuthRequest';
import { User } from '../users/entities/user.entity';
import { Timer } from './entities/timer.entity';
import { GetTimersDto } from './dto/get-timers.dto';
import { UpdateTimerDto } from './dto/update-timer.dto';

@Controller('timer')
export class TimerController {
  constructor(
    private readonly timerService: TimerService,
    private readonly userService: UsersService,
  ) {}

  @Post('start')
  async start(
    @Body() startTimerDto: StartTimerDto,
    @Req() request: AuthRequest,
  ) {
    const user = await this.userService.findOne(request.user.sub);
    if (user instanceof User) {
      const timer = await this.timerService.findOpenTimerByUser(user);
      if (timer === null) {
        return this.timerService.start(user, startTimerDto);
      }
      return 'User has already started a timer, and must stop it before starting another timer';
    }
    return 'User is missing';
  }

  @Post('end')
  async stop(@Req() request: AuthRequest) {
    const user = await this.userService.findOne(request.user.sub);
    if (user instanceof User) {
      const timer = await this.timerService.findOpenTimerByUser(user);
      if (timer instanceof Timer) {
        return await this.timerService.stop(timer);
      }
      return 'User has not stared a timer yet';
    }
    return 'User is missing';
  }
  @Get()
  async findAll(
    @Query() getTimersDto: GetTimersDto,
    @Req() request: AuthRequest,
  ) {
    const user = await this.userService.findOne(request.user.sub);
    if (user instanceof User) {
      return this.timerService.findAllByUserAndTitle(user, getTimersDto.title);
    }
    return 'User is missing';
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateTimerDto: UpdateTimerDto,
  ) {
    const timer = await this.timerService.findOne(+id);
    return this.timerService.update(timer, updateTimerDto);
  }

  @Get('sum')
  async sumAll(@Req() request: AuthRequest) {
    const user = await this.userService.findOne(request.user.sub);
    if (user instanceof User) {
      return this.timerService.findAllByUserAndSumDuration(user);
    }
    return 'User is missing';
  }
}
