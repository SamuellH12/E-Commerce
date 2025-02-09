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
exports.encryptData = encryptData;
exports.cardTypeValidation = cardTypeValidation;
exports.cardDateValidation = cardDateValidation;
exports.decryptCardData = decryptCardData;
exports.validateCard = validateCard;
exports.parseCardSchema = parseCardSchema;
const crypto_1 = __importDefault(require("crypto"));
const card_schemas_1 = require("../schema/card-schemas");
// Chave de criptografia (deve ter 32 bytes para AES-256)
const ENCRYPTION_KEY = crypto_1.default.randomBytes(32);
const IV_LENGTH = 16; // Tamanho do IV (16 bytes para AES)
// Função para criptografar
function encryptData(cardData) {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(cardData, "utf8", "hex");
    encrypted += cipher.final("hex");
    return {
        iv: iv.toString("hex"),
        encryptedData: encrypted,
    };
}
function cardTypeValidation(numero) {
    const tamanho = numero.length;
    const verificador = Number(numero[tamanho - 1]);
    const resto = numero.substring(0, tamanho - 1);
    let soma = 0;
    for (let i = tamanho - 2; i >= 0; i -= 1) {
        let num = Number(resto[i]);
        if (i % 2 === 0)
            num *= 2;
        if (num > 9)
            num -= 9;
        soma += num;
    }
    if (soma % 10 !== Number(verificador))
        return "invalid";
    switch (tamanho) {
        case 13:
            if (numero[0] === "4")
                return "VISA";
            return "invalid";
        case 16:
            if (numero.substring(0, 2) in ["51", "52", "53", "54", "55"] ||
                (Number(numero.substring(0, 4)) >= 2221 &&
                    Number(numero.substring(0, 4)) <= 2720))
                return "MasterCard";
            if (numero[0] === "4")
                return "VISA";
            return "invalid";
        case 19:
            if (numero[0] === "4")
                return "VISA";
            return "invalid";
        default:
            return "invalid";
    }
}
function cardDateValidation(data) {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const ano = Number(data.substring(0, 4));
    const mes = Number(data.substring(5, 7));
    if (ano < anoAtual)
        return "invalid";
    if (ano === anoAtual && mes < mesAtual)
        return "invalid";
    return "valid";
}
// Função para descriptografar
function decryptCardData(encryptedData, iv) {
    const decipher = crypto_1.default.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
function validateCard(req, res, next) {
    const card = req.body;
    // validate card
    const typeResult = cardTypeValidation(card.code);
    if (typeResult === "invalid") {
        res.status(400).send("Invalid card number");
        return;
    }
    const dateResult = cardDateValidation(card.expiration);
    if (dateResult === "invalid") {
        res.status(400).send("Invalid expiration date");
        return;
    }
    next();
}
function parseCardSchema(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            card_schemas_1.cardSchema.parse(req.body);
            next();
        }
        catch (error) {
            res.status(400).json({ error: error.errors });
        }
    });
}
