import { Asset } from "./asset.model";
import { Category } from "./category.model";

export interface Product {
  _id?: string;
  name: string;
  category: Category;
  image?: Asset;
  description?: string;
  price: number;
}
