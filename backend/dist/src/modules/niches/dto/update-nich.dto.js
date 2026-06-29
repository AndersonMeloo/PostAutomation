"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNichDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nich_dto_1 = require("./create-nich.dto");
class UpdateNichDto extends (0, mapped_types_1.PartialType)(create_nich_dto_1.CreateNichDto) {
}
exports.UpdateNichDto = UpdateNichDto;
//# sourceMappingURL=update-nich.dto.js.map