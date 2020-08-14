import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import {
  NotFoundException,
  Inject,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { NewPostInput } from './dto/new-post.input';
import { User } from 'src/auth/entities/user.entity';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { GqlAuthGuard } from 'src/auth/authGuard';

@Resolver(of => Post)
@UseGuards(GqlAuthGuard)
export class PostResolver {
  constructor(
    @Inject(PostService)
    private postsService: PostService,
  ) { }

  @Query(returns => Post)
  async post(@Args('id') id: string): Promise<Post> {
    const post = await this.postsService.findOneById(id);
    if (!post) {
      throw new NotFoundException(id);
    }
    return post;
  }
  @Query(returns => [Post])
  async posts(): Promise<Post[]> {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Mutation(returns => Boolean)
  async deletePost(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return await this.postsService.deletePost(id, user);
  }

  @Mutation(returns => Post)
  async updatePost(
    @Args('input') input: NewPostInput,
    @CurrentUser() user: User,
  ): Promise<Post> {
    return await this.postsService.updatePost(input, user);
  }

  @Mutation(returns => Post)
  @UsePipes(ValidationPipe)
  async createPost(
    @Args('input') input: NewPostInput,
    @CurrentUser() user: User,
  ): Promise<Post> {
    return await this.postsService.createPost(input, user);
  }
}
