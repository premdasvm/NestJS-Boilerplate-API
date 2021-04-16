import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as byCrypt from 'bcrypt';

import { Query_Get_User_By_Phone } from './db-Queries';
import { SignInDto } from './dto/signIn.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private manager: EntityManager) {}

  async login(signInDto: SignInDto): Promise<{ accessToken: string }> {
    let { phone, password } = signInDto;

    const [user] = await this.manager.query(Query_Get_User_By_Phone(phone));

    const isPasswordValid = await this.validatePassword(password, user.password, user.salt);

    if (user && isPasswordValid) {
      const { user_id, role_name, region } = user;

      return await this.generateToken(user_id, role_name, region);
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  //#region Private Methods

  private async validatePassword(password: string, userPassword: string, userSalt: string): Promise<boolean> {
    const hash = await byCrypt.hash(password, userSalt);
    const isRightPassword = hash === userPassword;
    if (!isRightPassword) {
      throw new UnauthorizedException(`Invalid password, Please try again`);
    }
    return isRightPassword;
  }

  private async generateToken(user_id: string, role: string, region: number) {
    const payload: JwtPayload = { user_id, role, region };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
  //#endregion
}
