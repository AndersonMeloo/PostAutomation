import { Injectable } from '@nestjs/common';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';

@Injectable()
export class NichesService {
  create(createNichDto: CreateNichDto) {
    return 'This action adds a new nich';
  }

  findAll() {
    return `This action returns all niches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nich`;
  }

  update(id: number, updateNichDto: UpdateNichDto) {
    return `This action updates a #${id} nich`;
  }

  remove(id: number) {
    return `This action removes a #${id} nich`;
  }
}
