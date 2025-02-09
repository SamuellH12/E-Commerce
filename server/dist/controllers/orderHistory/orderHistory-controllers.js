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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderHistory = void 0;
const orderHistory_utils_1 = require("./utils/orderHistory-utils");
const getOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Usa a função utilitária para buscar os dados
        const orderHistory = yield (0, orderHistory_utils_1.fetchOrderHistory)();
        // Retorna os dados como JSON
        res.status(200).json(orderHistory);
    }
    catch (error) {
        console.error("Erro inesperado:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});
exports.getOrderHistory = getOrderHistory;
