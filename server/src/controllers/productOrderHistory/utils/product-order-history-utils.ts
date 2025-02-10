import supabase from "../../../supabase/supabase";
import { ProductOrderHistory, productOrderHistorySchema } from "../schemas/product-order-history-schema";


// Função para buscar os itens de um pedido específico
export const fetchProductOrderHistoryByOrderId = async (orderId: number) => {
    const { data } = await supabase
      .from("product-order-history")
      .select("*")
      .eq("order_id", orderId); // Filtra pelo order_id
  
    return data || [];
  };
    