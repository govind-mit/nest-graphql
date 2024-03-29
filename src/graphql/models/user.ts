import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ length: 50 })
  @Field()
  first_name: string;

  @Column({ length: 50 })
  @Field()
  last_name: string;

  @Column({ length: 50 })
  @Field()
  email: string;

  @Column({ length: 20 })
  @Field()
  phone: string;

  @Column({ length: 255 })
  @Field()
  password: string;

  @Column()
  @Field(() => Int)
  role_id: number;

  @Column({ default: null })
  @Field(() => Int, { nullable: true })
  auth_code: number | null;

  @Column({ default: 0 })
  @Field(() => Int)
  is_verified: number;

  @Column({ default: 0 })
  @Field(() => Int)
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updated_at: Date;
}
