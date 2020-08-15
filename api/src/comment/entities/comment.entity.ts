import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  text: string;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.comments,
    { eager: false },
  )
  user: User;


  @Field(type => Post)
  @ManyToOne(
    type => Post,
    post => post.comments,
    { eager: false, cascade: true, onDelete: 'CASCADE' },
  )
  post: Post;
}
