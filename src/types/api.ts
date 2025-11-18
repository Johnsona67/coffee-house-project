export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;        
  discountPrice?: string; 
  category: string;       
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}