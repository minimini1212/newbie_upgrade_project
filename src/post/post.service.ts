import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { EMPTY_POST } from './const/post.exception-message';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    // 게시글 생성
    async create(createPostDto: CreatePostDto, userId: number) {
        const { title, content } = createPostDto;

        const post = await this.postRepository.save({
            title,
            content,
            userId,
        });
        return post;
    }

    // 게시글 전체 조회
    async findAll() {
        const posts = await this.postRepository.find();

        if (posts.length < 1) {
            throw new NotFoundException(EMPTY_POST);
        }

        return posts;
    }

    // 게시글 조회
    async findOne(id: number) {
        const post = await this.postRepository.findOne({
            where: { id },
        });

        if (!post) {
            throw new NotFoundException(EMPTY_POST);
        }

        return post;
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    remove(id: number) {
        return `This action removes a #${id} post`;
    }
}
