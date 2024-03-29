import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateOrderInput,
  UpdateOrderInput,
} from './orderDto/createOrderInput';
import { Schedule_Order } from 'src/graphql/models/schedule_orders';
import { EmailTemplateService } from '../emailtemplates/emailtemplateservices';
import { sendEmails } from 'src/helper/sendEmails';
import { CurrentUserData } from 'src/common/current_user_dto';
import { replace_email_template } from 'src/common/replace_email_templates';
import configuration from 'config/configuration';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Schedule_Order)
    private scheduleOrderRepository: Repository<Schedule_Order>,
    private readonly emailService: EmailTemplateService,
  ) {}

  async createOrder(scheduleOrderData: CreateOrderInput) {
    try {
      return this.scheduleOrderRepository.save(scheduleOrderData);
    } catch (error) {
      throw new InternalServerErrorException(
        'An internal server error occurred',
        error.message,
      );
    }
  }

  async updateOrder(
    scheduleOrderData: UpdateOrderInput,
    current_user: CurrentUserData,
  ) {
    try {
      const scheduleOrderToUpdate = await this.findById(
        scheduleOrderData?.order_id,
      );

      Object.assign(scheduleOrderToUpdate, scheduleOrderData);
      await this.scheduleOrderRepository.save(scheduleOrderToUpdate);

      const emailTemplateDetlais =
        await this.emailService.getEmailTemplateByEmailAction(
          'payment_success_email_template',
        );

      const translationsData = {
        user_name: current_user?.name,
        amount: scheduleOrderToUpdate?.amount,
        transaction_id: scheduleOrderToUpdate?.transaction_id,
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
      return scheduleOrderToUpdate;
    } catch (error) {
      throw new InternalServerErrorException(
        'An internal server error occurred',
        error.message,
      );
    }
  }

  // find order by order id
  async findById(id: number): Promise<Schedule_Order | undefined | null> {
    const order = await this.scheduleOrderRepository.findOne({ where: { id } });
    return order;
  }
}
