export interface Product {
  id: number;
  name: string;
  category: "Pria" | "Wanita" | "Kain" | "Celana" | "Sepatu";
  price: number;
  pattern: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}