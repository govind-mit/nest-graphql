import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'availability' })
@ObjectType()
export class Availability {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column({ length: 50 })
  @Field()
  key: string;

  @Column('jsonb')
  @Field(() => GraphQLJSONObject)
  value: Record<string, any>;
}
