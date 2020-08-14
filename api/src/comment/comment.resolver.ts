import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Inject, UseGuards, NotFoundException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { GqlAuthGuard } from 'src/auth/authGuard';
import { NewCommentInput } from './dto/new-comment.input';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Comment } from './entities/comment.entity';

@Resolver(of => Comment)
@UseGuards(GqlAuthGuard)
export class CommentResolver {
  constructor(
    @Inject(CommentService)
    private commentService: CommentService,
  ) { }

  @Query(returns => Comment)
  async comment(@Args('id') id: string): Promise<Comment> {
    const comment = await this.commentService.findCommentById(id);
    if (!comment) {
      throw new NotFoundException(id);
    }
    return comment;
  }

  @Query(returns => [Comment])
  async comments(): Promise<Comment[]> {
    return await this.commentService.getComments();
  }
  @Mutation(returns => Boolean)
  async deleteComment(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.commentService.deleteComment(id, user);
  }

  @Mutation(returns => Comment)
  async updateComment(
    @Args('input') comment: NewCommentInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.updateComment(comment, user);
  }

  @Mutation(returns => Comment)
  async createComment(
    @Args('input') newComment: NewCommentInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.createComment(newComment, user);
  }
}
