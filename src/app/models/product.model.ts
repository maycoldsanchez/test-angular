import { Category } from "./category.model";

export interface Product {
  id: string | number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
  creationAt: string;
  updatedAt: string;
}


export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> { }

