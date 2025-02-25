import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_API_KEY || "";
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}


// import { createClient } from "@supabase/supabase-js";

// const supabaseKey = process.env.SUPABASE_API_KEY;
// const supabaseUrl = process.env.SUPABASE_URL;

// if (!supabaseKey) {
//   throw new Error("Database API key is not defined");
// }

// if (!supabaseUrl) {
//   throw new Error("Database connection url is not defined");
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;
