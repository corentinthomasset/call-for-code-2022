import { compareTwoStrings } from 'string-similarity';
import { Product, Result } from '@/types';
import api from '../api';

export default async function searchMarketplaces(product: Product): Promise<Result[]> {
  return new Promise((resolve, reject) => {
    const query = `${product.name} ${product.keywords.join(' ')}`;
    api.provider().functions.createExecution('6338a6f2ac57ee706977', JSON.stringify({
      query,
      location: 'montreal',
    })).then(({ response }) => {
      let res: Result[] = [];
      if (response) {
        res = JSON.parse(response);
      }
      // Compute result ratings using string-similarity
      for (let i = 0; i < res.length; i += 1) {
        res[i].rating = compareTwoStrings(query, res[i].title);
      }
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
