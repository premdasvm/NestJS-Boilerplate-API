import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as byCrypt from 'bcrypt';
import { userIdGenerator } from '../../common/utils/userId-generator';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Auth) private authRepository: Repository<Auth>, private connection: Connection) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let { firstName, lastName, phone, email, address, region, state, password, role, photo } = createUserDto;

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    let newUser = new User();
    let newAuth = new Auth();

    newUser.user_id = userIdGenerator(role);
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.address = address;
    newUser.region = region;
    newUser.state = state;
    newUser.role = role;
    newUser.photo = photo;

    newAuth.user_id = newUser.user_id;
    newAuth.phone = phone;
    newAuth.salt = await byCrypt.genSalt();
    newAuth.password = await this.hashPassword(password, newAuth.salt);

    try {
      await queryRunner.manager.save(Auth, newAuth);
      const result = await queryRunner.manager.save(User, newUser);

      queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(`Creating User failed, Please try again!`, error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const result = await this.userRepository.findOne(id);

    if (!result) {
      throw new NotFoundException(`No user found under this id`);
    }

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected <= 0) {
      throw new InternalServerErrorException(`Update Failed, Please try again!`);
    }

    return result;
  }

  async blockUser(id: number) {
    const result = await this.userRepository.update(id, { activeStatus: true });

    if (result.affected <= 0) {
      throw new InternalServerErrorException(`Activation failed, Please try again!`);
    }

    return result;
  }

  async unBlockUser(id: number) {
    const result = await this.userRepository.update(id, { activeStatus: false });

    if (result.affected <= 0) {
      throw new InternalServerErrorException(`Deactivation failed, Please try again!`);
    }

    return result;
  }

  async remove(id: number) {
    const result = await this.userRepository.softDelete(id);

    if (result.affected <= 0) {
      throw new InternalServerErrorException(`Delete failed, Please try again!`);
    }

    return result;
  }

  //#region Private Methods

  private async hashPassword(password: string, salt: string): Promise<string> {
    return byCrypt.hash(password, salt);
  }

  //#endregion
}
