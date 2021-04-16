import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('auth')
@Unique(['phone'])
export class Auth {
  @PrimaryColumn()
  user_id: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @DeleteDateColumn({ name: 'delete_at' })
  deleted_At?: Date;
}
