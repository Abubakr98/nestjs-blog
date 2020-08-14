import { Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @Field()
  @IsNotEmpty()
  id?: string;

  @Field()
  @IsNotEmpty()
  text: string;

  @Field()
  @IsNotEmpty()
  postId?: string;
}
