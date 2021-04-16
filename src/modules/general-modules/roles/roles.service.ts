import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService extends TypeOrmCrudService<Role> {
  constructor(@InjectRepository(Role) repo) {
    super(repo);
  }
}
