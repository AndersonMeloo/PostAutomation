import { PrismaService } from 'src/database/prisma.service';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';
export declare class NichesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createNichDto: CreateNichDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        active: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        active: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        active: boolean;
    }>;
    update(id: string, updateNichDto: UpdateNichDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        active: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        active: boolean;
    }>;
}
