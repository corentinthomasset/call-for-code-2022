export interface Product {
  name: string,
  price: string,
  keywords: string[],
  coverImage: URL,
  url: URL,
}

export interface Result {
  title: string,
  price: string,
  location: string,
  coverImage: URL,
  url: URL,
}

export interface Search {
  timestamp: number,
  product: Product,
  results: Result[],
  tabId: number | null,
}
