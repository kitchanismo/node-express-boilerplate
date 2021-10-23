import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({
    length: 50,
  })
  username: string;

  @Column({
    length: 50,
  })
  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at?: Date;

  @UpdateDateColumn({ select: false, type: "timestamp" })
  updated_at?: Date;
}
