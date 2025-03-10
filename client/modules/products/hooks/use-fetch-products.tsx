// import { supabase } from "@/supabase";
// import useSWR from "swr";

// async function productsFetcher(url: string) {
//   try {
//     try {
//       // Fetch data from the 'produto' table
//       const response = await supabase.from("products").select("*");

//       if (response.error) {
//         throw response.error;
//       }

//       // Return the data
//       return response;
//     } catch (error: any) {
//       console.error("Error fetching products:", error.message);
//     }
//   } catch (error: any) {
//     console.error(error.message);
//   }
// }

// export function useFetchProducts() {
//   const { data, isLoading } = useSWR("/api/products", productsFetcher);

//   return { data, isLoading };
// }
