export interface Product {
  url: string,
  name: string,
  brand: string,
  description: string,
  price: string,
  keywords: string[],
  images: string[]
}

export interface Result {
  title: string,
  price: string,
  location: string,
  coverImage: URL,
  link: URL,
}
