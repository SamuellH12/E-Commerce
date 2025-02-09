import supabase from "../../../supabase/supabase";
import { orderHistorySchema } from "../schema/orderHistory-schema";

// Função para buscar o histórico de pedidos
export const fetchOrderHistory = async () => {
  try {
    const { data, error } = await supabase
      .from("order-history")
      .select("*");

    if (error) {
      throw new Error(`Erro ao buscar histórico de pedidos: ${error.message}`);
    }

    // Valida os dados usando o esquema
    const validatedData = data.map((item) => orderHistorySchema.parse(item));
    return validatedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};