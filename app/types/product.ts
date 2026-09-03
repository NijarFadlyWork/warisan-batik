export interface Product {
  id: string;
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