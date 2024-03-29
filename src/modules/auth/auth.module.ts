import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.services';
import { User } from '../../graphql/models/user';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'config/configuration';
import { Email_Template } from 'src/graphql/models/email_templates';
import { EmailTemplateService } from '../emailtemplates/emailtemplateservices';
@Module({
  imports: [
    JwtModule.register({
      secret: configuration().jwtSecret || process.env.JWT_SECRET,
      signOptions: { expiresIn: configuration().jwtExpiration },
    }),
    TypeOrmModule.forFeature([User, Email_Template]),
  ],
  providers: [AuthResolver, AuthService, EmailTemplateService],
})
export class AuthModule {}
