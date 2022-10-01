import { Product, Result } from '@/types';
import searchFBMarketplace from './marketplaces/facebookMarketplace';

export default async function searchMarketplaces(product: Product): Promise<Result[]> {
  console.log(product);
  const res = await searchFBMarketplace('montreal', `${product.name} ${product.description} ${product.brand}`);
  console.log(res);
  return res;
}
