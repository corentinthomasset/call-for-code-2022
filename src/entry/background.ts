import { Product } from '@/types';
import searchMarketplaces from '@/scripts/searchMarketplaces';
import MessageSender = chrome.runtime.MessageSender;
import Tab = chrome.tabs.Tab;

async function getCurrentTab(): Promise<Tab|undefined> {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(
  (product: Product, sender:MessageSender, sendResponse) => {
    searchMarketplaces(product).then((results) => {
      sendResponse(results);
      getCurrentTab().then((tab) => {
        if (tab && tab.id) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['notification.js'],
          });
        }
      });
    }).catch((err) => {
      console.error(`Error while searching marketplaces: ${err}.\nNo results were returned.`);
      sendResponse([]);
    });
    return true;
  },
);
