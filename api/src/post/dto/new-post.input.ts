import { Field, InputType, ID } from '@nestjs/graphql';
import { type } from 'os';

@InputType()
export class NewPostInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  readonly text: string;
}
