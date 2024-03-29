import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from '../../graphql/models/user';
import { CreateUserInput } from './usersDto/createUserInput';
import { UserService } from './users.services';
import { UpdateUserInput } from './usersDto/updateUserInput';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middleware/auth.guard';
import { AuthorizationGuard } from 'src/middleware/auth.middleware';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  //create user
  @Mutation(() => User)
  @UseGuards(AuthorizationGuard)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }

  //update  user
  @Mutation(() => User)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput) {
    return this.userService.updateUser(updateUserData);
  }

  //get user by id
  @Query(() => User, { nullable: true })
  @UseGuards(AuthorizationGuard, AuthGuard)
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  //get uasers
  @Query(() => [User])
  @UseGuards(AuthorizationGuard, AuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
}
