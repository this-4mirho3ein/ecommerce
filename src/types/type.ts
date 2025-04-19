export interface ProductItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
}

export interface IProductList {
  first: number | null
  prev: number | null
  next: number | null
  last: number | null
  pages: number | null
  items: number | null
  data: ProductItemProps[]
}
