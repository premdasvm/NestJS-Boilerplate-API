import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('roles')
@Unique(['role_name'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;
}
