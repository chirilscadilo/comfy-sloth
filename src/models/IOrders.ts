import { Product } from "./IProduct";

export interface OrdersProps {
  uid?: string | null;
  displayName?: string | null;
  email?: string | null;
  phone?: string | null;
  totalAmount?: number | null;
  totalSum?: number | null;
  products: Product[];
}
