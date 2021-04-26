import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Auth]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
