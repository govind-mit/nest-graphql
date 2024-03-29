import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ScheduleService } from './schedule.services';
import { ScheduleResolver } from './schedule.resolver';
import { Schedule } from 'src/graphql/models/schedule';
import { EmailTemplateService } from '../emailtemplates/emailtemplateservices';
import { Email_Template } from 'src/graphql/models/email_templates';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Email_Template])],
  providers: [
    ScheduleResolver,
    ScheduleService,
    JwtService,
    EmailTemplateService,
  ],
})
export class ScheduleModule {}
