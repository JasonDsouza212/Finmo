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
    async createPayin(@Body() payinData: any): Promise<boolean> {
      try {
        await this.userService.createPayin(payinData);
        return true;
      } catch (error) {
        // Handle the error as needed
        return false;
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
