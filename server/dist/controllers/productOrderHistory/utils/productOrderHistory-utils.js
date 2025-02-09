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
exports.fetchProductOrderHistoryByOrderId = void 0;
const supabase_1 = __importDefault(require("../../../supabase/supabase"));
// Função para buscar os itens de um pedido específico
const fetchProductOrderHistoryByOrderId = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield supabase_1.default
        .from("product-order-history")
        .select("*")
        .eq("order_id", orderId); // Filtra pelo order_id
    return data || [];
});
exports.fetchProductOrderHistoryByOrderId = fetchProductOrderHistoryByOrderId;
