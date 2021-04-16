import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Crud({
  model: {
    type: Role,
  },
  dto: {
    create: CreateRoleDto,
    update: UpdateRoleDto,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('roles')
export class RolesController implements CrudController<Role> {
  constructor(public service: RolesService) {}
}
