import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportYoutubePostDto } from './dto/import-youtube-post.dto';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
import { PostsService } from './posts.service';
import type { Multer } from 'multer';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAllPosts() {
    return this.postsService.listPosts();
  }

  @Get('overview')
  getOverview(@Query('date') date?: string) {
    return this.postsService.getPostsOverviewByDate(date);
  }

  @Post('import-youtube-url')
  importYoutubeUrl(@Body() body: ImportYoutubePostDto) {
    return this.postsService.createPostFromYoutubeUrl(body);
  }

  @Post('upload-video')
  @UseInterceptors(FileInterceptor('video'))
  uploadVideo(
    @UploadedFile() file: Multer.File,
    @Body() data: UploadVideoPostDto,
  ) {
    return this.postsService.uploadVideoPost(file, data);
  }
}
