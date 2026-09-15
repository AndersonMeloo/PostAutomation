import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import type { Response } from 'express';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards';
import { ImportYoutubePostDto } from './dto/import-youtube-post.dto';
import { UploadVideoPostDto } from './dto/upload-video-post.dto';
import { CreateDraftDto } from './dto/create-draft.dto';
import { EditDraftDto } from './dto/edit-draft.dto';
import { FinalizeDraftDto } from './dto/finalize-draft.dto';
import { PostsService } from './posts.service';
import type { Multer } from 'multer';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  private getUserIdFromRequest(req: { user?: { sub?: string } }): string {
    const userId = req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException(
        'Usuario autenticado nao encontrado na requisicao',
      );
    }

    return userId;
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllPosts(@Req() req: { user?: { sub?: string } }) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.listPosts(userId);
  }

  @UseGuards(AuthGuard)
  @Get('overview')
  getOverview(
    @Req() req: { user?: { sub?: string } },
    @Query('date') date?: string,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.getPostsOverviewByDate(userId, date);
  }

  @UseGuards(AuthGuard)
  @Get(':id/analytics')
  getPostAnalytics(
    @Req() req: { user?: { sub?: string } },
    @Param('id') id: string,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.getPostAnalyticsHistory(userId, id);
  }

  @UseGuards(AuthGuard)
  @Get('drafts')
  listDrafts(@Req() req: { user?: { sub?: string } }) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.listDrafts(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id/draft')
  getDraft(
    @Req() req: { user?: { sub?: string } },
    @Param('id') id: string,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.getDraftById(userId, id);
  }

  // Servem o arquivo (local ou remoto) pro <video>/<img> do editor. Ficam
  // atrás do AuthGuard porque tags <video>/<img> nao mandam Authorization
  // header - o frontend busca via fetch() com Bearer token e usa o blob
  // resultante, entao essas rotas so respondem a chamadas ja autenticadas.
  @UseGuards(AuthGuard)
  @Get(':id/draft/video')
  async streamDraftVideo(
    @Req() req: { user?: { sub?: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const userId = this.getUserIdFromRequest(req);
    await this.streamDraftAsset(userId, id, 'video', res);
  }

  @UseGuards(AuthGuard)
  @Get(':id/draft/thumbnail')
  async streamDraftThumbnail(
    @Req() req: { user?: { sub?: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const userId = this.getUserIdFromRequest(req);
    await this.streamDraftAsset(userId, id, 'thumbnail', res);
  }

  private async streamDraftAsset(
    userId: string,
    postId: string,
    kind: 'video' | 'thumbnail',
    res: Response,
  ) {
    const source = await this.postsService.getDraftAssetSource(
      userId,
      postId,
      kind,
    );

    if (/^https?:\/\//i.test(source)) {
      res.redirect(source);
      return;
    }

    if (!existsSync(source)) {
      res.status(404).end();
      return;
    }

    res.sendFile(source);
  }

  @UseGuards(AuthGuard)
  @Post('draft')
  @UseInterceptors(FileInterceptor('video'))
  createDraft(
    @Req() req: { user?: { sub?: string } },
    @UploadedFile() file: Multer.File,
    @Body() data: CreateDraftDto,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.createDraft(userId, file, data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/edit')
  editDraft(
    @Req() req: { user?: { sub?: string } },
    @Param('id') id: string,
    @Body() data: EditDraftDto,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.editDraft(userId, id, data);
  }

  @UseGuards(AuthGuard)
  @Post(':id/thumbnail')
  @UseInterceptors(FileInterceptor('thumbnail'))
  uploadThumbnail(
    @Req() req: { user?: { sub?: string } },
    @Param('id') id: string,
    @UploadedFile() file: Multer.File,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.uploadDraftThumbnail(userId, id, file);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/finalize')
  finalizeDraft(
    @Req() req: { user?: { sub?: string } },
    @Param('id') id: string,
    @Body() data: FinalizeDraftDto,
  ) {
    const userId = this.getUserIdFromRequest(req);
    return this.postsService.finalizeDraft(userId, id, data);
  }

  @UseGuards(AuthGuard)
  @Post('import-youtube-url')
  importYoutubeUrl(
    @Req() req: { user?: { sub?: string } },
    @Body() body: ImportYoutubePostDto,
  ) {
    const userId = this.getUserIdFromRequest(req);

    return this.postsService.createPostFromYoutubeUrl({
      ...body,
      userId,
    });
  }

  @UseGuards(AuthGuard)
  @Post('upload-video')
  @UseInterceptors(FileInterceptor('video'))
  uploadVideo(
    @Req() req: { user?: { sub?: string } },
    @UploadedFile() file: Multer.File,
    @Body() data: UploadVideoPostDto,
  ) {
    const userId = this.getUserIdFromRequest(req);

    return this.postsService.uploadVideoPost(file, {
      ...data,
      userId,
    });
  }
}
