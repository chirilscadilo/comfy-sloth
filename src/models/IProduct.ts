export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  category: string;
  company: string;
  amount: number;
}

export interface ProductFavoriteInterface {
  id?: string;
  name?: string;
  price?: number;
  img?: string;
  description?: string;
  category?: string;
  company?: string;
}
