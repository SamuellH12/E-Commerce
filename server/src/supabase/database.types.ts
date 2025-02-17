export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cards: {
        Row: {
          card_type: string
          code: string
          code_iv: string
          code_last4: string
          created_at: string
          expiration: string
          expiration_iv: string
          id: number
          name: string
          nickname: string | null
        }
        Insert: {
          card_type: string
          code: string
          code_iv: string
          code_last4: string
          created_at?: string
          expiration: string
          expiration_iv: string
          id?: number
          name: string
          nickname?: string | null
        }
        Update: {
          card_type?: string
          code?: string
          code_iv?: string
          code_last4?: string
          created_at?: string
          expiration?: string
          expiration_iv?: string
          id?: number
          name?: string
          nickname?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          codename: string
          created_at: string
          expiration_date: string | null
          id: number
          percentage: number
        }
        Insert: {
          codename?: string
          created_at?: string
          expiration_date?: string | null
          id?: number
          percentage?: number
        }
        Update: {
          codename?: string
          created_at?: string
          expiration_date?: string | null
          id?: number
          percentage?: number
        }
        Relationships: []
      }
      coupons_test: {
        Row: {
          codename: string
          created_at: string
          expiration_date: string | null
          id: number
          percentage: number
        }
        Insert: {
          codename?: string
          created_at?: string
          expiration_date?: string | null
          id?: number
          percentage?: number
        }
        Update: {
          codename?: string
          created_at?: string
          expiration_date?: string | null
          id?: number
          percentage?: number
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      "order-history": {
        Row: {
          created_at: string
          destination: string | null
          order_data: string | null
          order_id: number
          status: Database["public"]["Enums"]["OrderStatus"] | null
          total_value: number | null
        }
        Insert: {
          created_at?: string
          destination?: string | null
          order_data?: string | null
          order_id?: number
          status?: Database["public"]["Enums"]["OrderStatus"] | null
          total_value?: number | null
        }
        Update: {
          created_at?: string
          destination?: string | null
          order_data?: string | null
          order_id?: number
          status?: Database["public"]["Enums"]["OrderStatus"] | null
          total_value?: number | null
        }
        Relationships: []
      }
      "product-order-history": {
        Row: {
          amount: number | null
          created_at: string
          id: number
          order_id: number | null
          price_paid: number | null
          product_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: number
          order_id?: number | null
          price_paid?: number | null
          product_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: number
          order_id?: number | null
          price_paid?: number | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product-order-history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "order-history"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "product-order-history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number | null
          stock_quantity: number | null
          update_at: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price?: number | null
          stock_quantity?: number | null
          update_at?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number | null
          stock_quantity?: number | null
          update_at?: string | null
        }
        Relationships: []
      }
      "shopping-cart": {
        Row: {
          amount: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number | null
          stock_quantity: number | null
          total_price: number | null
        }
        Insert: {
          amount?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price?: number | null
          stock_quantity?: number | null
          total_price?: number | null
        }
        Update: {
          amount?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number | null
          stock_quantity?: number | null
          total_price?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      OrderStatus:
        | "pending"
        | "failed"
        | "returned"
        | "processing"
        | "canceled"
        | "shipped"
        | "delivered"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
