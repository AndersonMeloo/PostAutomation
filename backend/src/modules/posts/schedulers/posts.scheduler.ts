import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PostsService } from '../posts.service';

@Injectable()
export class PostsScheduler {
  constructor(private readonly postsService: PostsService) {}

  // Reduzido de "a cada minuto" para "a cada 15 minutos" para economizar
  // créditos do Railway enquanto o SaaS está em desenvolvimento/teste.
  // Antes de lançar de verdade, considere voltar para um intervalo menor.
  @Cron('*/15 * * * *')
  async handleCron() {
    // console.log('Iniciando automação de posts...');

    try {
      const importedVideos =
        await this.postsService.importInboxVideosAsShorts();

      if (importedVideos.length > 0) {
        console.log(
          `  Shorts importados automaticamente: ${importedVideos.length}`,
        );
      }

      // Geração automatica por nicho foi pausada para evitar posts de teste
      // como "TesteAPI | Conteudo automatico #...".
      // Fluxo ativo no momento: apenas importacao da pasta inbox.
      // const users = await this.postsService.getUsersWithNiches();
      // for (const user of users) {
      //   if (!user.niches.length) continue;
      //   for (const niche of user.niches) {
      //     console.log(`  Gerando Posts | User: ${user.id} | Niche: ${niche.id}`);
      //     await this.postsService.createAutoPosts(user.id, niche.id);
      //   }
      // }

      // console.log('Automação finalizada');
    } catch (error) {
      console.error('Erro na automação:', error);
    }
  }
}
