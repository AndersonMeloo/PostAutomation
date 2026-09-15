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
exports.EditDraftDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class EditDraftDto {
    title;
    description;
    format;
    trimStart;
    trimEnd;
}
exports.EditDraftDto = EditDraftDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'title deve ser uma string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, { message: 'title muito grande' }),
    __metadata("design:type", String)
], EditDraftDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'description deve ser uma string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500, { message: 'description muito grande' }),
    __metadata("design:type", String)
], EditDraftDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.VideoFormat, { message: 'format deve ser SHORT ou STANDARD' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EditDraftDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'trimStart deve ser um numero (segundos)' }),
    (0, class_validator_1.Min)(0, { message: 'trimStart nao pode ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EditDraftDto.prototype, "trimStart", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'trimEnd deve ser um numero (segundos)' }),
    (0, class_validator_1.Min)(0, { message: 'trimEnd nao pode ser negativo' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EditDraftDto.prototype, "trimEnd", void 0);
//# sourceMappingURL=edit-draft.dto.js.map