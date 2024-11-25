import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import {User} from './User.entity';

@Entity({ name: "user_detail" })
export class UserDetail {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 10 })
  nick!: string;

  @Column({ type: "varchar", length: 25 })
  fullName!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}