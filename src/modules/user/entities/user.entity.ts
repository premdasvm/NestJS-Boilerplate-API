import { Role } from 'src/modules/general-modules/roles/entities/role.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  image: string;

  @ManyToOne(
    type => Role,
    role => role.id,
  )
  role: number;

  @Column({ default: true })
  activeStatus: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deleted_At?: Date;
}
