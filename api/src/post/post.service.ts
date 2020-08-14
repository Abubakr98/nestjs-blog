import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/auth/user-role.enum';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) { }

  async findOneById(id: string): Promise<Post> {
    return this.postRepository.findOneById(id);
  }
  async deletePost(id: string, user: User): Promise<boolean> {
    let result;
    if (user.role === UserRole.ADMIN) {
      result = await this.postRepository.delete({ id });
    } else {
      result = await this.postRepository.delete({ id, user });
    }
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    } else {
      return true;
    }
  }
  async getPosts(): Promise<Post[]> {
    return await this.postRepository.getPosts();
  }
  async updatePost(post: CreatePostDto, user: User): Promise<Post> {
    return await this.postRepository.updatePost(post, user);
  }
  async createPost(post: CreatePostDto, user: User): Promise<Post> {
    return await this.postRepository.createPost(post, user);
  }
}
