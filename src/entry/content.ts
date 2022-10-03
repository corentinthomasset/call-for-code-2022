import { Product } from '@/types';
import parseIkeaProduct from '../scripts/parsers/ikea';

const pageUrl: Location = document.location;
const host: string = pageUrl.hostname;

let product: Product | null = null;
if (host.includes('ikea.com')) {
  product = parseIkeaProduct(pageUrl);
}

if (product) {
  chrome.runtime.sendMessage(product, (response) => {
    console.log(response);
    if (response.data) {
      console.log('ok');
    }
  });
}
