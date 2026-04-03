import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards';
import { Platform } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Buscando todos os Usuários
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Buscando todos os E-mails
  @UseGuards(AuthGuard)
  @Get('emails')
  findAllEmails() {
    return this.usersService.findAllEmails();
  }

  // Buscando Usuário por E-mail
  @UseGuards(AuthGuard)
  @Get('email/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/youtube-connection')
  getYoutubeConnection(@Param('id') id: string): Promise<{
    connected: boolean;
    account: {
      id: string;
      platform: Platform;
      tokenExpiry: Date | null;
    } | null;
  }> {
    return this.usersService.getYoutubeConnectionStatus(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/youtube-connection')
  disconnectYoutube(@Param('id') id: string): Promise<{
    message: string;
  }> {
    return this.usersService.disconnectYoutube(id);
  }

  // Atualizar Dados do Usuário
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Deletar um Usuário
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
