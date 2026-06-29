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
exports.ImportYoutubePostDto = void 0;
const class_validator_1 = require("class-validator");
class ImportYoutubePostDto {
    userId = '';
    nicheId = '';
    youtubeUrl = '';
    scheduledAt = '';
}
exports.ImportYoutubePostDto = ImportYoutubePostDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'userId deve ser um UUID valido' }),
    __metadata("design:type", String)
], ImportYoutubePostDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'nicheId deve ser um UUID valido' }),
    __metadata("design:type", String)
], ImportYoutubePostDto.prototype, "nicheId", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'youtubeUrl deve ser uma URL valida' }),
    (0, class_validator_1.MaxLength)(500, { message: 'youtubeUrl muito grande' }),
    __metadata("design:type", String)
], ImportYoutubePostDto.prototype, "youtubeUrl", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)({}, { message: 'scheduledAt deve estar no formato ISO8601' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImportYoutubePostDto.prototype, "scheduledAt", void 0);
//# sourceMappingURL=import-youtube-post.dto.js.map