import { compareTwoStrings } from 'string-similarity';
import { Product, Result } from '@/types';
import { Models } from 'appwrite';
import api from '../api';

export default async function searchMarketplaces(product: Product): Promise<Result[]> {
  return new Promise((resolve, reject) => {
    const searchFunctions = ['6338a6f2ac57ee706977', '6354a0e6f27888512206'];
    const query = `${product.name} ${product.keywords.join(' ')}`;
    const location = 'montreal';
    const promises: Promise<Models.Execution>[] = [];
    for (let i = 0; i < searchFunctions.length; i += 1) {
      promises.push(
        new Promise((res, rej) => {
          setTimeout(() => {
            api.provider().functions.createExecution(searchFunctions[i], JSON.stringify({
              query,
              location,
            })).then((result) => res(result)).catch(((err) => { rej(err); }));
          }, i * 100);
        }),
      );
    }
    Promise.allSettled(promises).then((results) => {
      const searchResults: Result[] = [];
      const errors:string[] = [];
      results.forEach((res) => {
        if (res.status === 'fulfilled') {
          const data = JSON.parse(res.value.response);
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
