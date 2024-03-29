import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule_orders' })
@ObjectType()
export class Schedule_Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  schedule_id: number;

  @Column()
  @Field(() => Int)
  user_id: number;

  @Column({ length: 200, nullable: true })
  @Field()
  transaction_id: string | null;

  @Column({ type: 'float', nullable: false })
  @Field(() => Float)
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  payment_date: Date;

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

  @Column({ length: 20, default: 'unpaid' })
  @Field()
  status: string;
}
