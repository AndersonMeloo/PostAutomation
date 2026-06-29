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
exports.UploadVideoPostDto = void 0;
const class_validator_1 = require("class-validator");
class UploadVideoPostDto {
    userId = '';
    nicheId = '';
    title = '';
    description;
    scheduledAt = '';
}
exports.UploadVideoPostDto = UploadVideoPostDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'userId deve ser um UUID valido' }),
    __metadata("design:type", String)
], UploadVideoPostDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'nicheId deve ser um UUID valido' }),
    __metadata("design:type", String)
], UploadVideoPostDto.prototype, "nicheId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'title deve ser uma string' }),
    (0, class_validator_1.MaxLength)(255, { message: 'title muito grande' }),
    __metadata("design:type", String)
], UploadVideoPostDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'description deve ser uma string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500, { message: 'description muito grande' }),
    __metadata("design:type", String)
], UploadVideoPostDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({}, { message: 'scheduledAt deve estar no formato ISO8601' }),
    __metadata("design:type", String)
], UploadVideoPostDto.prototype, "scheduledAt", void 0);
//# sourceMappingURL=upload-video-post.dto.js.map