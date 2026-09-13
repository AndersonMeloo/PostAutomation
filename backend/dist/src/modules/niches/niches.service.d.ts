import { PrismaService } from 'src/database/prisma.service';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';
export declare class NichesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createNichDto: CreateNichDto): Promise<{
        name: string;
        id: string;
        description: string | null;
        active: boolean;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        description: string | null;
        active: boolean;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        description: string | null;
        active: boolean;
    }>;
    update(id: string, updateNichDto: UpdateNichDto): Promise<{
        name: string;
        id: string;
        description: string | null;
        active: boolean;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: string;
        description: string | null;
        active: boolean;
    }>;
}
