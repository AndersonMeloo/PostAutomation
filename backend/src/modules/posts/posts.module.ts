import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { PublishScheduler } from './schedulers/publish.scheduler';
import { PostsScheduler } from './schedulers/posts.scheduler';

@Module({
  imports: [PrismaModule],
  providers: [PostsService, PostsScheduler, PublishScheduler],
  controllers: [PostsController],
})
export class PostsModule {}
