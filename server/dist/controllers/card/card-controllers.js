"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCards = getAllCards;
exports.createCard = createCard;
const supabase_1 = __importDefault(require("../../supabase/supabase"));
const card_utils_1 = require("./utils/card-utils");
function getAllCards(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase_1.default.from("cards").select("*");
        if (error)
            res.status(500).json(error);
        res.json(data);
    });
}
function createCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = req.body;
        const cardType = (0, card_utils_1.cardTypeValidation)(card.code);
        const encryptedNumber = (0, card_utils_1.encryptData)(card.code);
        const encryptedExpiration = (0, card_utils_1.encryptData)(card.expiration);
        const { error } = yield supabase_1.default.from("cards").insert({
            nickname: card.nickname,
            name: card.name,
            expiration: encryptedExpiration.encryptedData,
            code: encryptedNumber.encryptedData,
            card_type: cardType,
            code_last4: card.code.substring(card.code.length - 4),
            code_iv: encryptedNumber.iv,
            expiration_iv: encryptedExpiration.iv,
        });
        if (error)
            res.status(500).json(error);
        res.send("Card created successfully");
    });
}
