import { Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @Field({ nullable: true })
  @IsNotEmpty()
  id?: string;

  @Field()
  @IsNotEmpty()
  text: string;
}
