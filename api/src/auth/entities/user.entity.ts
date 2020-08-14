import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user-role.enum';
import { Post } from 'src/post/entities/post.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { type } from 'os';

@ObjectType()
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => String)
  @Column()
  name: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  salt: string;

  @Field()
  @Column()
  role: UserRole;

  @Field(type => [Post], { nullable: true })
  @OneToMany(
    type => Post,
    post => post.user,
    { eager: true },
  )
  posts: Promise<Post[]>;

  @Field(type => [Comment], { nullable: true })
  @OneToMany(
    type => Comment,
    comment => comment.user,
    { eager: true },
  )
  comments: Promise<Comment[]>;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
