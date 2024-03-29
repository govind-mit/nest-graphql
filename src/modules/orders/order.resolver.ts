import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import {
  CreateOrderInput,
  UpdateOrderInput,
} from './orderDto/createOrderInput';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middleware/auth.guard';
import { AuthorizationGuard } from 'src/middleware/auth.middleware';
import { Schedule_Order } from 'src/graphql/models/schedule_orders';
import { OrderService } from './order.services';

@Resolver(() => Schedule_Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  //create Order
  @Mutation(() => Schedule_Order)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async createOrder(
    @Args('createOrderData') createOrderData: CreateOrderInput,
  ) {
    return this.orderService.createOrder(createOrderData);
  }

  //update  Order
  @Mutation(() => Schedule_Order)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async updateOrder(
    @Args('updateOrderData') updateOrderData: UpdateOrderInput,
    @Context() context: any,
  ) {
    const current_user = context.req.user;
    return this.orderService.updateOrder(updateOrderData, current_user);
  }
}
