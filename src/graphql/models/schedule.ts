import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';

@Entity({ name: 'schedules' })
@ObjectType()
export class Schedule {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @Column({ type: 'time' })
  @Field()
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @Column({ type: 'time' })
  @Field()
  @IsNotEmpty()
  @IsString()
  end_time: string;

  @Column({ length: 20 })
  @Field()
  @IsNotEmpty()
  @IsString()
  type: string;

  @Column({ default: null })
  @Field({ nullable: true })
  @IsString()
  status: string | null;

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
