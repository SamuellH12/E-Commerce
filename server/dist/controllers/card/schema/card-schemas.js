"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSchema = void 0;
const zod_1 = require("zod");
exports.cardSchema = zod_1.z.object({
    nickname: zod_1.z.string(),
    name: zod_1.z.string().nonempty(),
    code: zod_1.z.string().min(13).max(16),
    expiration: zod_1.z.string().min(7).max(7),
    cvc: zod_1.z.string().min(3).max(3),
});
