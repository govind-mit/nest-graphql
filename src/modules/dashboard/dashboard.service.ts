import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/graphql/models/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { User } from 'src/graphql/models/user';
import { generatedTodayDatetime } from 'src/common/generateTodayDateTime';
import { Schedule_Order } from 'src/graphql/models/schedule_orders';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Schedule_Order)
    private scheduleOrderRepository: Repository<Schedule_Order>,
  ) {}

  async getDashboardData() {
    const totalSchedules = await this.scheduleRepository.count();
    const totalUsers = await this.userRepository.count();
    const totalOrders = await this.scheduleOrderRepository.count();
    const { startOfToday, endOfToday } = generatedTodayDatetime();
    const todayRegisteredUsers = await this.userRepository.find({
      where: {
        created_at: Between(startOfToday, endOfToday),
      },
    });
    const todaySchedules = await this.scheduleRepository.find({
      where: {
        created_at: Between(startOfToday, endOfToday),
      },
    });
    const todayOrders = await this.scheduleOrderRepository.find({
      where: {
        created_at: Between(startOfToday, endOfToday),
      },
    });
    const dashboardData = {
      totalSchedules: totalSchedules,
      totalUsers: totalUsers,
      totalOrders: totalOrders,
      todayRegisteredUsers: todayRegisteredUsers,
      todaySchedules: todaySchedules,
      todayOrders: todayOrders,
    };
    return JSON.stringify(dashboardData);
  }

  async getDashboardDataByUserId(id: number) {
    const totalSchedules = await this.scheduleRepository.count({
      where: { user_id: id },
    });
    const totalOrders = await this.scheduleOrderRepository.count({
      where: { user_id: id },
    });
    const { startOfToday, endOfToday } = generatedTodayDatetime();
    const todaySchedules = await this.scheduleRepository.find({
      where: {
        created_at: Between(startOfToday, endOfToday),
        user_id: id,
      },
    });
    const todayOrders = await this.scheduleOrderRepository.find({
      where: {
        created_at: Between(startOfToday, endOfToday),
        user_id: id,
      },
    });
    const totalCounts = {
      totalSchedules: totalSchedules,
      totalOrders: totalOrders,
      todaySchedules: todaySchedules,
      todayOrders: todayOrders,
    };
    return JSON.stringify(totalCounts);
  }
}
