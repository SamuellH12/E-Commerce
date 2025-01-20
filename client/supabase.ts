import { Database } from "@/utils/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {});

const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseKey);

export { supabase, supabaseAdmin };
