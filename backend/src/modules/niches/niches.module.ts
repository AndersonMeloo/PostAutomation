import { Module } from '@nestjs/common';
import { NichesService } from './niches.service';
import { NichesController } from './niches.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [NichesController],
  providers: [NichesService],
})
export class NichesModule {}
