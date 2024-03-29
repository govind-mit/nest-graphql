import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middleware/auth.guard';
import { AuthorizationGuard } from 'src/middleware/auth.middleware';
import { CreateOptionInput } from './optionDto/optionInput';
import { OptionService } from './option.services';
import { Option } from 'src/graphql/models/options';
@Resolver(() => Option)
export class OptionResolver {
  constructor(private optionService: OptionService) {}

  //create Option
  @Mutation(() => Option)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async createOption(
    @Args('createOptionData')
    createOptionData: CreateOptionInput,
  ) {
    return this.optionService.createOption(createOptionData);
  }

  //update  Option
  @Mutation(() => Option)
  @UseGuards(AuthorizationGuard, AuthGuard)
  async updateOption(
    @Args('updateOptionData')
    updateOptionData: CreateOptionInput,
  ) {
    return this.optionService.updateOption(updateOptionData);
  }

  //get options
  @Query(() => [Option])
  @UseGuards(AuthorizationGuard, AuthGuard)
  async getOptions() {
    return this.optionService.getOptions();
  }
}
