import { EntityRepository, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/comment.dto';
import { User } from 'src/auth/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { getRepository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from 'src/auth/user-role.enum';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async findCommentById(id: string): Promise<Comment> {
    const query = this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.user', 'user');

    return await query.where('comment.id = :id', { id }).getOne();
  }

  async getComments(): Promise<Comment[]> {
    const query = this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.user', 'user');

    return await query.getMany();
  }
  async updateComment(comment: CreateCommentDto, user: User): Promise<Comment> {
    const { id, text } = comment;
    let result: Comment;

    if (user.role === UserRole.ADMIN) {
      result = await this.findOne(id, { relations: ['post'] });
    }

    result = await this.findOne({ id, user: user }, { relations: ['post'] });

    if (!result) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }

    result.text = text;
    return await result.save();
  }

  async createComment(
    newComment: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const { text, postId } = newComment;
    const comment = new Comment();

    const postRepository = getRepository(Post);
    const post = await postRepository.findOne(postId);

    if (!post) {
      throw new NotFoundException(`Post with ID "${postId}" not found`);
    }
    comment.text = text;
    comment.user = user;
    comment.post = post;
    return await comment.save();
  }
}
