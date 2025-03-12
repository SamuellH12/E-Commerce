export type ProductType = {
  id: string;
  category_id?: string;
  created_at: Date;
  description?: string;

  image_url: string;
  is_active: boolean;
  name: string;
  price: number;
  stock_quantity: number;
  updated_at: Date;
};
