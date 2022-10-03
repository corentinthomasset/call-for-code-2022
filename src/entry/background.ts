import { Product } from '@/types';
import searchMarketplaces from '@/scripts/searchMarketplaces';
import MessageSender = chrome.runtime.MessageSender;

chrome.runtime.onMessage.addListener(
  (product: Product, sender:MessageSender, sendResponse) => {
    searchMarketplaces(product).then((results) => {
      sendResponse(results);
    }).catch((err) => {
      console.error(`Error while searching marketplaces: ${err}.\nNo results were returned.`);
      sendResponse([]);
    });
    return true;
  },
);
