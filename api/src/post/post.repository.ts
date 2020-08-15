import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/auth/user-role.enum';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  async findOneById(id: string): Promise<Post> {
    return await this.findOne(id, { relations: ['user'] });
  }
  async getPosts(): Promise<Post[]> {
    const query = this.createQueryBuilder('post').leftJoinAndSelect(
      'post.user',
      'user',
    );

    return await query.getMany();
  }

  async updatePost(newPost: CreatePostDto, user: User): Promise<Post> {
    const { id, text } = newPost;
    const postRepository = getRepository(Post);
    let post;

    if (user.role === UserRole.ADMIN) {
      post = await postRepository.findOne({ id });
    }

    post = await postRepository.findOne({ id, user: user });

    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }

    post.text = text;
    return await post.save();
  }

  async createPost(newPost: CreatePostDto, user: User): Promise<Post> {
    const { text } = newPost;
    const post = new Post();
    post.text = text;
    post.user = user;
    return await post.save();
  }
}
