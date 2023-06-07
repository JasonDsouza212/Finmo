import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // authenticating sandbox
  @Get('login')
  async getUserLogin() {
    return this.userService.authenticate();
  }

  // Login with accesskey and secret key
  @Post('loginwithcred')
  async login(@Body() loginData: any): Promise<boolean> {
    try {
      return await this.userService.login(JSON.stringify(loginData));
    } catch (error) {
      return false;
    }
  }

  // Logout from the App
  @Get('logout')
  async logout(): Promise<boolean> {
    try {
      return await this.userService.logout();
    } catch (error) {
      return false;
    }
  }

  // authenticating payin
  @Get('authpayin')
  async getUserauthpayin() {
    return this.userService.authpayin();
  }

  // authenticating Payout
  @Get('authpayout')
  async getUserauthpayout() {
    return this.userService.authpayout();
  }

  // get payin all options
  @Get('payin')
  async getUserpayinMethods() {
    return this.userService.payinmethods();
  }

  // get payout all options
  @Get('payout')
  async getUserpayoutMethods() {
    return this.userService.payoutmethods();
  }

  // All payins that are made
  @Get('payin/all')
  async getUserpayinall() {
    return this.userService.payinall();
  }

  // All payouts that are made
  @Get('payout/all')
  async getUserpayoutalll() {
    return this.userService.payoutall();
  }

  // to payin using the app
  @Post('payinnow')
  async createPayinNow(@Body() payinData: any): Promise<any> {
    try {
      return await this.userService.createPayin(payinData);
    } catch (error) {
      return false;
    }
  }

  // to payout to others
  @Post('payoutnow')
  async createPayout(@Body() payoutData: any): Promise<boolean> {
    try {
      await this.userService.createPayout(payoutData);
      return true;
    } catch (error) {
      return false;
    }
  }

  // add customer
  @Post('addcustomer')
  async addcustomer(@Body() addcustomerData: any): Promise<boolean> {
    try {
      await this.userService.addcustomer(addcustomerData);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get all customers
  @Get('allcustomer')
  async allcustomer() {
    return this.userService.allcustomer();
  }

  // get details of individual customer
  @Get('customer/:customerId')
  async customerdetails(@Param('customerId') customerId: string) {
    return this.userService.customerdetails(customerId);
  }
  
  // get details of individual Payin
  @Get('payin/:payinId')
  async individualpayindetails(@Param('payinId') payinId: string) {
    return this.userService.individualpayindetails(payinId);
  }

    // Delete individual customer
    @Delete('customer/:customerId')
    async deleteCustomer(@Param('customerId') customerId: string):Promise<any> {
      return this.userService.deleteCustomer(customerId);
    }
}
