"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NichesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let NichesService = class NichesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNichDto) {
        return this.prisma.niche.create({
            data: {
                name: createNichDto.name,
                description: createNichDto.description ?? null,
                active: createNichDto.active ?? true,
            },
        });
    }
    async findAll() {
        return this.prisma.niche.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const niche = await this.prisma.niche.findUnique({
            where: { id },
        });
        if (!niche) {
            throw new common_1.NotFoundException(`Nicho com ID ${id} nao encontrado`);
        }
        return niche;
    }
    async update(id, updateNichDto) {
        await this.findOne(id);
        return this.prisma.niche.update({
            where: { id },
            data: {
                name: updateNichDto.name,
                description: updateNichDto.description === undefined
                    ? undefined
                    : updateNichDto.description,
                active: updateNichDto.active,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.niche.delete({
            where: { id },
        });
    }
};
exports.NichesService = NichesService;
exports.NichesService = NichesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NichesService);
//# sourceMappingURL=niches.service.js.map