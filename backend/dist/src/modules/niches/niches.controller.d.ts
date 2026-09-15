import { NichesService } from './niches.service';
import { CreateNichDto } from './dto/create-nich.dto';
import { UpdateNichDto } from './dto/update-nich.dto';
export declare class NichesController {
    private readonly nichesService;
    constructor(nichesService: NichesService);
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
