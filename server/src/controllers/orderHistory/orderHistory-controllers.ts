import { Request, Response } from "express";
import { fetchOrderHistory } from "./utils/orderHistory-utils";

export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    // Usa a função utilitária para buscar os dados
    const orderHistory = await fetchOrderHistory();

    // Retorna os dados como JSON
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error("Erro inesperado:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};