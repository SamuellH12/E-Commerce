import { supabase } from "@/supabase";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Supabase client

// Create a new user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch data from the 'produto' table
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      throw error;
    }

    // Return the data
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: error.message });
  }
}
