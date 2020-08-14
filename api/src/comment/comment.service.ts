import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment.dto';
import { User } from 'src/auth/entities/user.entity';
import { CommentRepository } from './comment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserRole } from 'src/auth/user-role.enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) { }

  async findCommentById(id: string): Promise<Comment> {
    return await this.commentRepository.findCommentById(id);
  }

  async getComments(): Promise<Comment[]> {
    return await this.commentRepository.getComments();
  }

  async deleteComment(id: string, user: User): Promise<boolean> {
    let result;

    if (user.role === UserRole.ADMIN) {
      result = await this.commentRepository.delete({ id });
    } else {
      result = await this.commentRepository.delete({ id, user });
    }

    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    } else {
      return true;
    }
  }

  async updateComment(comment: CreateCommentDto, user: User): Promise<Comment> {
    return this.commentRepository.updateComment(comment, user);
  }

  async createComment(
    newComment: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    return await this.commentRepository.createComment(newComment, user);
  }
}
