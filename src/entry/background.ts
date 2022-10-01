import { Product } from '@/types';
import searchMarketplaces from '@/scripts/searchMarketplaces';
import MessageSender = chrome.runtime.MessageSender;

/*
chrome.runtime.onMessage.addListener(
  (product: Product, sender:MessageSender, sendResponse) => {
    searchMarketplaces(product).then((results) => {
      sendResponse({ results });
    });
  },
);
*/
chrome.runtime.onMessage.addListener(
  (product: Product, sender:MessageSender, sendResponse) => {
    fetch('https://m.facebook.com/marketplace/montreal/home/?query=KIVIK%20Canap%C3%A9,%20Tibbleby%20beige/gris%20ikea', {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'upgrade-insecure-requests': '1',
        'viewport-width': '2560',
      },
      body: null,
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  },
);
