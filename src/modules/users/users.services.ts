import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../graphql/models/user';
import { CreateUserInput } from './usersDto/createUserInput';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './usersDto/updateUserInput';
import { generateOTP } from 'src/common/generateOtp';
import { sendEmails } from 'src/helper/sendEmails';
import { EmailTemplateService } from '../emailtemplates/emailtemplateservices';
import { replace_email_template } from 'src/common/replace_email_templates';
import configuration from 'config/configuration';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly emailService: EmailTemplateService,
  ) {}

  async createUser(createUserData: CreateUserInput) {
    const user = await this.findByEmail(createUserData?.email);
    if (user) {
      throw new ConflictException('Email already registered');
    } else {
      const hashPassword = await bcrypt.hash(createUserData?.password, 12);
      const genOtp = generateOTP(4);
      const newUser = this.usersRepository.create({
        ...createUserData,
        password: hashPassword,
        auth_code: parseInt(genOtp),
      });

      const emailTemplateDetlais =
        await this.emailService.getEmailTemplateByEmailAction(
          'registration_email_template',
        );

      const translationsData = {
        user_name: createUserData?.first_name,
        otp: parseInt(genOtp),
        support_email: configuration().supportEmail,
        app_name: configuration().appName,
      };

      const template = replace_email_template(
        emailTemplateDetlais?.content,
        translationsData,
      );

      const sendEmailData = {
        emailTo: createUserData?.email,
        emailSub: emailTemplateDetlais.subject,
        emailMsg: template,
      };
      sendEmails(sendEmailData);
      return this.usersRepository.save(newUser);
    }
  }

  async updateUser(updateUserData: UpdateUserInput) {
    const userId = updateUserData?.id;
    const userToUpdate = await this.usersRepository.findOne({
      where: { id: userId },
    });
    Object.assign(userToUpdate, updateUserData);
    await this.usersRepository.save(userToUpdate);
    return userToUpdate;
  }

  async getUserById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async getUsers() {
    return this.usersRepository.find();
  }

  // find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
}
