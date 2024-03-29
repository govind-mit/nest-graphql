import { Repository } from 'typeorm';
import { CreateAvailabilityInput } from './availabilityDto/availabilityInputDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Availability } from 'src/graphql/models/availability';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async getAvailabilityById(userId: number) {
    const res = await this.availabilityRepository.find({
      where: { userId },
      select: ['key', 'value'],
    });
    const extractedData = res.map(({ key, value }) => ({ key, value }));
    return {
      message: 'Availability Getting successfully',
      status: 200,
      values: JSON.stringify(extractedData),
    };
  }

  async createAvailability(
    createAvailabilityData: CreateAvailabilityInput,
    currentUser: any,
  ): Promise<Availability> {
    const CheckAvailabilityExit = await this.getAvailabilityByUserIdAndKey(
      currentUser?.id,
      createAvailabilityData?.key,
    );
    if (CheckAvailabilityExit) {
      throw new BadRequestException('Availability already exist');
    } else {
      const availability = this.availabilityRepository.create({
        ...createAvailabilityData,
        userId: currentUser?.id,
      });
      return this.availabilityRepository.save(availability);
    }
  }

  async updateAvailability(
    updateAvailabilityData: CreateAvailabilityInput,
    currentUser: any,
  ) {
    const AvailabilityToUpdate = await this.getAvailabilityByUserIdAndKey(
      currentUser?.id,
      updateAvailabilityData?.key,
    );
    if (!AvailabilityToUpdate) {
      throw new BadRequestException('Please enter valid key');
    } else {
      AvailabilityToUpdate.value = updateAvailabilityData.value;
      await this.availabilityRepository.save(AvailabilityToUpdate);
      return AvailabilityToUpdate;
    }
  }

  //get availability by userId and key
  async getAvailabilityByUserIdAndKey(userId: number, key: string) {
    return await this.availabilityRepository.findOne({
      where: { userId, key },
    });
  }
}
