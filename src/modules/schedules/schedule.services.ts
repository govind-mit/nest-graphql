import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleInput } from './scheduleDto/scheduleCreateInput';
import { Repository } from 'typeorm';
import { Schedule } from 'src/graphql/models/schedule';
import { sendEmails } from 'src/helper/sendEmails';
import { CurrentUserData } from 'src/common/current_user_dto';
import { EmailTemplateService } from '../emailtemplates/emailtemplateservices';
import configuration from 'config/configuration';
import { replace_email_template } from 'src/common/replace_email_templates';
import { format } from 'date-fns';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private readonly emailService: EmailTemplateService,
  ) {}

  async createSchedule(
    createScheduleData: CreateScheduleInput,
    current_user: CurrentUserData,
  ) {
    try {
      const emailTemplateDetlais =
        await this.emailService.getEmailTemplateByEmailAction(
          'schedule_email_template',
        );

      const translationsData = {
        user_name: current_user?.name,
        date: format(new Date(createScheduleData?.date), 'd MMM, yyyy'),
        start_time: createScheduleData?.start_time,
        end_time: createScheduleData?.end_time,
        support_email: configuration().supportEmail,
        app_name: configuration().appName,
      };

      const template = replace_email_template(
        emailTemplateDetlais?.content,
        translationsData,
      );
      const sendEmailData = {
        emailTo: current_user?.email,
        emailSub: emailTemplateDetlais.subject,
        emailMsg: template,
      };
      sendEmails(sendEmailData);
      return await this.scheduleRepository.save(createScheduleData);
    } catch (error) {
      throw new InternalServerErrorException(
        'An enternal server error occurred',
        error.message,
      );
    }
  }

  async updateScheduleByIdanduserId(
    updateScheduleData: CreateScheduleInput,
    current_user: CurrentUserData,
  ) {
    const scheduleToUpdate = await this.findScheduleByuserIdandId(
      updateScheduleData?.user_id,
      updateScheduleData?.schedule_id,
    );
    if (!scheduleToUpdate) {
      throw new BadRequestException(
        'Please enter valid user_id and schedule_id',
      );
    }
    try {
      Object.assign(scheduleToUpdate, updateScheduleData);
      await this.scheduleRepository.save(scheduleToUpdate);

      let emailTemplateDetlais;
      if (updateScheduleData?.status === 'cancled') {
        emailTemplateDetlais =
          await this.emailService.getEmailTemplateByEmailAction(
            'schedule_cancel_email_template',
          );
      } else {
        emailTemplateDetlais =
          await this.emailService.getEmailTemplateByEmailAction(
            'schedule_update_email_template',
          );
      }
      const translationsData = {
        user_name: current_user?.name,
        date: format(new Date(scheduleToUpdate?.date), 'd MMM, yyyy'),
        start_time: scheduleToUpdate?.start_time,
        end_time: scheduleToUpdate?.end_time,
        support_email: configuration().supportEmail,
        app_name: configuration().appName,
      };

      const template = replace_email_template(
        emailTemplateDetlais?.content,
        translationsData,
      );
      const sendEmailData = {
        emailTo: current_user?.email,
        emailSub: emailTemplateDetlais.subject,
        emailMsg: template,
      };
      sendEmails(sendEmailData);

      return scheduleToUpdate;
    } catch (error) {
      throw new InternalServerErrorException(
        'An enternal server error occurred',
        error.message,
      );
    }
  }

  async getScheduleDetailsById(id: number) {
    try {
      return this.scheduleRepository.find({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An enternal server error occurred',
        error.message,
      );
    }
  }

  async getSchedulesByUserId(userId: number) {
    try {
      return await this.scheduleRepository.find({
        where: { user_id: userId },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An enternal server error occurred',
        error.message,
      );
    }
  }

  //find schedule by id and userid
  async findScheduleByuserIdandId(
    user_id: number,
    id: number,
  ): Promise<Schedule | undefined | null> {
    const schedule = await this.scheduleRepository.findOne({
      where: { user_id, id },
    });
    return schedule;
  }
}
