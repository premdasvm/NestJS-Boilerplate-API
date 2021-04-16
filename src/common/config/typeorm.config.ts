import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options = {
      type: this.configService.get('CONNECTION_TYPE'),
      host: this.configService.get('HOST'),
      port: this.configService.get<number>('PORT'),
      username: this.configService.get('USER_NAME'),
      password: this.configService.get('PASSWORD'),
      database: this.configService.get('DATABASE'),
      synchronize: this.configService.get('SYNCHRONIZE'),
      logging: this.configService.get('LOGGING'),
      entities: ['dist/**/*.entity{.ts,.js}'],
    } as TypeOrmModuleOptions;
    return options;
  }
}
