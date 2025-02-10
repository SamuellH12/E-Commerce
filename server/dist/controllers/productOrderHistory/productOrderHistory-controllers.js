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
exports.getProductOrderHistory = void 0;
const productOrderHistory_utils_1 = require("./utils/productOrderHistory-utils");
const getProductOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtém o order_id da query string
        const orderId = Number(req.query.order_id);
        //problema esta aqui haha
        /*if (!orderId || isNaN(orderId)) {
          return res.status(400).json({ message: "Parâmetro 'order_id' inválido" });
        }*/
        // Usa a função utilitária para buscar os itens do pedido
        const productOrderHistory = yield (0, productOrderHistory_utils_1.fetchProductOrderHistoryByOrderId)(orderId);
        // Retorna os dados como JSON
        res.status(200).json(productOrderHistory);
    }
    catch (error) {
        console.error("Erro inesperado:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});
exports.getProductOrderHistory = getProductOrderHistory;
