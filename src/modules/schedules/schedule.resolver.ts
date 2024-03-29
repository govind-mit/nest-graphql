import { Resolver, Query, Args, Mutation, Int, Context } from '@nestjs/graphql';
import { CreateScheduleInput } from './scheduleDto/scheduleCreateInput';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middleware/auth.guard';
import { AuthorizationGuard } from 'src/middleware/auth.middleware';
import { Schedule } from 'src/graphql/models/schedule';
import { ScheduleService } from './schedule.services';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private scheduleService: ScheduleService) {}

  //create schedule (appointment)
  @Mutation(() => Schedule)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async createSchedule(
    @Args('createScheduleData') createScheduleData: CreateScheduleInput,
    @Context() context: any,
  ) {
    const current_user = context.req.user;
    return this.scheduleService.createSchedule(
      createScheduleData,
      current_user,
    );
  }

  //update schedule by userid and schedule id
  @Mutation(() => Schedule)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async updateScheduleByIdandUserId(
    @Args('updateScheduleData') updateScheduleData: CreateScheduleInput,
    @Context() context: any,
  ) {
    const current_user = context.req.user;
    return this.scheduleService.updateScheduleByIdanduserId(
      updateScheduleData,
      current_user,
    );
  }

  // get schedules by user id
  @Query(() => [Schedule])
  @UseGuards(AuthorizationGuard, AuthGuard)
  async getSchedulesByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.scheduleService.getSchedulesByUserId(userId);
  }

  // get schedules details by id
  @Query(() => [Schedule])
  @UseGuards(AuthorizationGuard, AuthGuard)
  async getScheduleDetailsById(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.getScheduleDetailsById(id);
  }
}
