import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { UserEntityUpdateDto } from './dtos/userUpdate.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @ApiOperation({ summary: 'Get user data' })
  async getUserData(@Req() request: Request) {
    return this.userService.getUserById(request.user.id);
  }

  @Delete('')
  @ApiOperation({ summary: 'Delete user' })
  async deleteUser(@Req() request: Request, @Res() response: Response) {
    return this.userService.deleteUserById(request.user.id, response);
  }

  @Put('')
  @ApiOperation({ summary: 'Update user data' })
  async updateUser(@Req() req: Request, @Body() userData: UserEntityUpdateDto) {
    return this.userService.updateUser(req.user.id, userData);
  }
}
