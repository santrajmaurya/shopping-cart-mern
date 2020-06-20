export interface IProduct {
    title: string,
    description: string,
    price: number,
    image: string
}

export interface IDirectory {
    title: string,
    imageUrl: string,
    id: number | string,
    linkUrl: string
}

export interface ICartItems {
    id: number | string,
    imageUrl: string,
    name: string,
    price: number,
    quantity?: number
}

export interface IItem {
  id: number | string;
  name: string;
  imageUrl: string;
  price: number;
}

export interface IShopData {
  id: number | string;
  items: IItem[];
  routeName: string;
  title: string;
}

export interface ICollections {
  [key: string]: IShopData;
}