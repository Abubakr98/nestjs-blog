import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewCommentInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  text: string;

  @Field({ nullable: true })
  postId?: string;
}
