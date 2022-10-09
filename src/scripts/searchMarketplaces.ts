import { Product, Result } from '@/types';
import api from '../api';

export default async function searchMarketplaces(product: Product): Promise<Result[]> {
  return new Promise((resolve, reject) => {
    api.provider().functions.createExecution('6338a6f2ac57ee706977', JSON.stringify({
      query: `${product.name}, ${product.keywords.join(', ')}`,
      location: 'montreal',
    })).then(({ response }) => {
      let res: Result[] = [];
      if (response) {
        res = JSON.parse(response);
      }
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
