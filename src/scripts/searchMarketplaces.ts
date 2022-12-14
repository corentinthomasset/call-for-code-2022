import { compareTwoStrings } from 'string-similarity';
import { Product, Result } from '@/types';
import facebookMarketplace from './searchs/facebookMarketplace';
import api from '../api';

export default async function searchMarketplaces(product: Product): Promise<Result[]> {
  return new Promise((resolve, reject) => {
    const query = `${product.name} ${product.keywords.join(' ')}`;
    const location = 'montreal';
    const promises: Promise<string>[] = [];

    const remoteSearchFunctions = ['kijiji-search.json'];
    const localSearchFunctions = [facebookMarketplace];

    // Local search functions
    for (let i = 0; i < localSearchFunctions.length; i += 1) {
      promises.push(localSearchFunctions[i](query, location));
    }
    // Remote search functions
    for (let i = 0; i < remoteSearchFunctions.length; i += 1) {
      promises.push(api.execute('kijiji-search.json', {
        query,
        location,
      }));
    }
    Promise.allSettled(promises).then((results) => {
      const searchResults: Result[] = [];
      const errors:string[] = [];
      results.forEach((res) => {
        if (res.status === 'fulfilled') {
          const data = JSON.parse(res.value).results;
          // Compute result ratings using string-similarity
          for (let i = 0; i < data.length; i += 1) {
            data[i].rating = compareTwoStrings(query, data[i].title);
          }
          searchResults.push(...data);
        } else if (res.status === 'rejected') {
          errors.push(res.reason);
        }
      });
      if (searchResults.length) {
        errors.forEach((error) => {
          console.warn(error);
        });
        resolve(searchResults);
      } else {
        reject(errors.join((', ')));
      }
    });
  });
}
