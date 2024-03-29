import { Repository } from 'typeorm';
import { CreateOptionInput } from './optionDto/optionInput';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Option } from 'src/graphql/models/options';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async getOptions() {
    return await this.optionRepository.find();
  }

  async createOption(
    createOptionData: CreateOptionInput,
  ): Promise<CreateOptionInput> {
    const option = await this.findOptionByOptionKey(
      createOptionData?.option_key,
    );
    if (option) {
      throw new BadRequestException('Option already registered');
    }
    return this.optionRepository.save(createOptionData);
  }

  async updateOption(updateOptionData: CreateOptionInput) {
    const OptionToUpdate = await this.findOptionByOptionKey(
      updateOptionData?.option_key,
    );
    if (!OptionToUpdate) {
      throw new BadRequestException('Please enter valid option_key');
    } else {
      OptionToUpdate.option_value = updateOptionData.option_value;
      await this.optionRepository.save(OptionToUpdate);
      return OptionToUpdate;
    }
  }

  //find option by option_key
  async findOptionByOptionKey(option_key: string) {
    const Option = await this.optionRepository.findOne({
      where: { option_key },
    });
    return Option;
  }
}
