import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BearerTokenGuard } from 'src/auth/guard/bearer.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @UseGuards(BearerTokenGuard)
    @Post()
    async create(@Body() createPostDto: CreatePostDto, @Req() req) {
        const userId = req.userId;
        console.log(userId);

        const newPost = await this.postService.create(createPostDto, +userId);

        return {
            statusCode: HttpStatus.CREATED,
            message: 'ok',
            newPost,
        };
    }

    @Get()
    async findAll() {
        const posts = await this.postService.findAll();

        return {
            statusCode: HttpStatus.OK,
            message: 'ok',
            posts,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const post = await this.postService.findOne(+id);

        return {
            statusCode: HttpStatus.OK,
            message: 'ok',
            post,
        };
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postService.remove(+id);
    }
}
