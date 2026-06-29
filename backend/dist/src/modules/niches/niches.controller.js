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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NichesController = void 0;
const common_1 = require("@nestjs/common");
const niches_service_1 = require("./niches.service");
const create_nich_dto_1 = require("./dto/create-nich.dto");
const update_nich_dto_1 = require("./dto/update-nich.dto");
let NichesController = class NichesController {
    nichesService;
    constructor(nichesService) {
        this.nichesService = nichesService;
    }
    async create(createNichDto) {
        return this.nichesService.create(createNichDto);
    }
    async findAll() {
        return this.nichesService.findAll();
    }
    findOne(id) {
        return this.nichesService.findOne(id);
    }
    update(id, updateNichDto) {
        return this.nichesService.update(id, updateNichDto);
    }
    remove(id) {
        return this.nichesService.remove(id);
    }
};
exports.NichesController = NichesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nich_dto_1.CreateNichDto]),
    __metadata("design:returntype", Promise)
], NichesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NichesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NichesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_nich_dto_1.UpdateNichDto]),
    __metadata("design:returntype", void 0)
], NichesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NichesController.prototype, "remove", null);
exports.NichesController = NichesController = __decorate([
    (0, common_1.Controller)('niches'),
    __metadata("design:paramtypes", [niches_service_1.NichesService])
], NichesController);
//# sourceMappingURL=niches.controller.js.map