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
