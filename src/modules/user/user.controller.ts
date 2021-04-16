import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('getAllUsers')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('getUser/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch('updateUser/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Post('blockUser/:id')
  async blockUser(@Param('id') id: string) {
    return await this.userService.blockUser(+id);
  }

  @Post('unBlockUser/:id')
  async unBlockUser(@Param('id') id: string) {
    return await this.userService.unBlockUser(+id);
  }

  @Delete('removeUser/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
