import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/common/utils/multer.config';
import { ImageUploadDto } from '../general-modules/roles/dto/upload-image.dto';
import { ChangePasswordDto } from '../general-modules/roles/dto/change-password.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a single User' })
  @Post('createUser')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all Users' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Get('getAllUsers')
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a single User' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Get('getUser/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a single User' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Patch('updateUser/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: `Upload a single User's image` })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Post('uploadImage/:user_id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', storage({ path: './uploads/users' })))
  async uploadImage(@Param('user_id') user_id: string, @Body() body: ImageUploadDto, @UploadedFile() file: Express.Multer.File) {
    return await this.userService.uploadImage(file, user_id);
  }

  @ApiOperation({ summary: 'Change Password a single user' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Patch('/changePassword')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.userService.changePassword(changePasswordDto);
  }

  @ApiOperation({ summary: 'Block a single User' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Post('blockUser/:id')
  async blockUser(@Param('id') id: string) {
    return await this.userService.blockUser(+id);
  }

  @ApiOperation({ summary: 'Unblock a single User' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Post('unBlockUser/:id')
  async unBlockUser(@Param('id') id: string) {
    return await this.userService.unBlockUser(+id);
  }

  @ApiOperation({ summary: 'Remove a single User' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Delete('removeUser/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
