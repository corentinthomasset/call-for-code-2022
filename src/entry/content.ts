import { Product } from '@/types';
import parseIkeaProduct from '../scripts/parsers/ikea';
import parseStructubeProduct from '../scripts/parsers/structube';
import parseAmazonProduct from '../scripts/parsers/amazon';
import MessageSender = chrome.runtime.MessageSender;

function productCallback(product: Product):void {
  console.log(`Searching for pre-loved "${product.name} ${product.keywords.join(' ')}" near you!`);
  chrome.runtime.sendMessage({ type: 'search', payload: product }, (resultsCount) => {
    if (resultsCount) {
      console.log(`${resultsCount} offers found.`);
    } else {
      console.log('No results.');
    }
  });
}

function parsePage():void {
  const pageUrl: Location = document.location;
  const host: string = pageUrl.hostname;
  if (host.includes('ikea.com')) {
    parseIkeaProduct(pageUrl, productCallback);
  }
  if (host.includes('structube.com')) {
    parseStructubeProduct(pageUrl, productCallback);
  }
  if (host.includes('amazon.')) {
    parseAmazonProduct(pageUrl, productCallback);
  }
}

// Parse the page when the script is loaded.
parsePage();

// Parse the page when history state is updated (Support for SPA)
chrome.runtime.onMessage.addListener(
  (message, sender:MessageSender, sendResponse:(payload:any) => void) => {
    if (message?.type === 'historyStateUpdated') {
      parsePage();
    }
    sendResponse(true);
  },
);
