import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import type { Database } from "./database.types";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
	throw new Error("Missing Supabase URL or API key");
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
