import { Product } from '@/types';
import parseIkeaProduct from '../scripts/parsers/ikea';

const pageUrl: Location = document.location;
const host: string = pageUrl.hostname;

let product: Product | null = null;
if (host.includes('ikea.com')) {
  product = parseIkeaProduct(pageUrl);
}

if (product) {
  console.log(`Searching for pre-loved "${product.name}, ${product.keywords.join(', ')}" near you!`);
  chrome.runtime.sendMessage({ type: 'search', payload: product }, (resultsCount) => {
    if (resultsCount) {
      console.log(`${resultsCount} offers found.`);
    } else {
      console.log('No results.');
    }
  });
}
