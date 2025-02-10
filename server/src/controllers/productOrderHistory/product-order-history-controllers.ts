import type { Request, Response } from "express";
import { fetchProductOrderHistoryByOrderId } from "./utils/product-order-history-utils";

export const getProductOrderHistory = async (req: Request, res: Response) => {
    try {
      // Obtém o order_id da query string
      const orderId = Number(req.query.order_id);
  
      //problema esta aqui haha
      /*if (!orderId || isNaN(orderId)) {
        return res.status(400).json({ message: "Parâmetro 'order_id' inválido" });
      }*/
  
      // Usa a função utilitária para buscar os itens do pedido
      const productOrderHistory = await fetchProductOrderHistoryByOrderId(orderId);
  
      // Retorna os dados como JSON
      res.status(200).json(productOrderHistory);
    } catch (error) {
      console.error("Erro inesperado:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  