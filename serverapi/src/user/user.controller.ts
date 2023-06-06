import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // authenticating sandbox 
  @Get("login")
  async getUserLogin() {
    return this.userService.authenticate();
  }


  @Post('loginwithcred')
  async login(@Body() loginData: any): Promise<boolean> {
    try {
      return await this.userService.login(JSON.stringify(loginData));
    } catch (error) {
      return false;
    }
  }

  @Get('logout')
  async logout(): Promise<boolean> {
    try {
      return await this.userService.logout();
    } catch (error) {
      return false;
    }
  }


  // authenticating payin 
  @Get("authpayin")
  async getUserauthpayin() {
    return this.userService.authpayin();
  }


  // authenticating Payout 
  @Get("authpayout")
  async getUserauthpayout() {
    return this.userService.authpayout();
  }


  // get payin all options 
  @Get("payin")
  async getUserpayinMethods() {
    return this.userService.payinmethods();
  }


  // get payout all options 
  @Get("payout")
  async getUserpayoutMethods() {
    return this.userService.payoutmethods();
  }

  // All payins 
  @Get("payin/all")
  async getUserpayinall() {
    return this.userService.payinall();
  }

    // All payouts 
    @Get("payout/all")
    async getUserpayoutalll() {
      return this.userService.payoutall();
    }

    @Post('payinnow')
    async createPayinNow(@Body() payinData: any): Promise<any> {
      try {
        return await this.userService.createPayin(payinData);
      //  return true;
      } catch (error) {
        // Handle the error as needed
        return false;
        // return error;
      }
    }

    @Post('payoutnow')
      async createPayout(@Body() payoutData: any): Promise<boolean> {
        try {
          await this.userService.createPayout(payoutData);
          return true;
        } catch (error) {
          // Handle the error as needed
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
        // Handle the error as needed
        return false;
      }
  }

      // add customer 
      @Get("allcustomer")
      async allcustomer() {
        return this.userService.allcustomer();
      }

}




































// import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto'
// import {UserService} from './user.service'

// @Controller('user')
// export class UserController {

//     constructor(private readonly userService: UserService) {}

//   @Get()
//   async getUserLogin() {
//     return  this.userService.authenticate();
//   }

    // @Get()
    // getUsers(){
    //     return [];
    // }

    // @Get()
    // getUserslogin(){
    //     return [];
    // }

    // @Get()
    // getUsersquery(@Query('type') type:string){
    //     return [{type}];
    // }

    // @Get(':id')
    // getOneUsers(@Param('id') id:string){
    //     return {
    //         id,
    //     };
    // }

    // @Post()
    // createUser(@Body() createUserDto : CreateUserDto){
    //     return {
    //         name: createUserDto.name
    //     }
    // }

// }
