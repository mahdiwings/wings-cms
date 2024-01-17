export interface Product {
  _id: string;
  category: Category;
  title: string;
  price: string;
  featured: boolean;
  size: Size;
  color: Color;
  images: Image[];
}

export interface Image {
  _id: string;
  url: string;
}

export interface Billboard {
  _id: string;
  lable: string;
  image: string;
}

export interface Category {
  _id: string;
  title: string;
  billboard: Billboard;
}

export interface Size {
  _id: string;
  title: string;
  value: string;
}

export interface Color {
  _id: string;
  title: string;
  value: string;
}
