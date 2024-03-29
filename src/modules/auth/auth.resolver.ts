import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.services';
import { UserLoginInput } from './authDto/UserLoginInput.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ResetPasswordInput } from './authDto/resetPasswordInput.dto';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/middleware/auth.middleware';
import { VerifyOtpInput } from './authDto/verifyOtpData';
import { SuccessResponse } from 'src/common/successResponce';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  //get Authorization Token
  @Query(() => SuccessResponse)
  async generateAuthorizationToken(): Promise<SuccessResponse> {
    return this.authService.generateAuthorizationToken();
  }

  //user login
  @Mutation(() => SuccessResponse)
  @UseGuards(AuthorizationGuard)
  async login(
    @Args('userLoginData') userLoginData: UserLoginInput,
  ): Promise<SuccessResponse> {
    return this.authService.login(userLoginData);
  }

  //forgot password
  @Mutation(() => String)
  @UseGuards(AuthorizationGuard)
  async forgotPassword(@Args('userEmail') email: string) {
    return this.authService.forgotPassword(email);
  }

  //verify otp
  @Mutation(() => SuccessResponse)
  @UseGuards(AuthorizationGuard)
  async verifyOtp(@Args('verifyOtpData') verifyOtpData: VerifyOtpInput) {
    return this.authService.verifyOtp(verifyOtpData);
  }

  //reset password
  @Mutation(() => String)
  @UseGuards(AuthorizationGuard)
  async resetpasssword(
    @Args('resetPasswordInput') ResetPasswordInput: ResetPasswordInput,
  ) {
    return this.authService.resetpassword(ResetPasswordInput);
  }
}
