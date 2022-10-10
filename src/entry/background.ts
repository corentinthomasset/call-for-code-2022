import _ from 'lodash';
import { Product, Search } from '@/types';
import searchMarketplaces from '@/scripts/searchMarketplaces';
import MessageSender = chrome.runtime.MessageSender;
import Tab = chrome.tabs.Tab;

async function getCurrentTab(): Promise<Tab|undefined> {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function searchHandler(
  product: Product,
  sender:MessageSender,
  sendResponse:(resultsCount: number) => void,
) {
  searchMarketplaces(product).then((results) => {
    chrome.storage.local.get(['history'], (result) => {
      const history: Search[] = result.history || [];
      const previousEntry = history[history.length - 1];

      if (previousEntry
        && _.isEqual(previousEntry.product, product)
        && _.isEqual(previousEntry.results, results)
      ) {
        previousEntry.timestamp = Date.now();
      } else {
        history.push({
          timestamp: Date.now(),
          product,
          results,
          tabId: sender.tab?.id || null,
        });
      }
      chrome.storage.local.set({ history });
    });
    sendResponse(results.length);
    getCurrentTab().then((tab) => {
      if (tab && tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['app.js'],
        });
      }
    });
  }).catch((err) => {
    console.error(`Error while searching marketplaces: ${err}.\nNo results were returned.`);
    sendResponse(0);
  });
  return true;
}

chrome.runtime.onMessage.addListener(
  (message, sender:MessageSender, sendResponse:(payload:any) => void) => {
    if (message.type === 'search') {
      return searchHandler(message.payload, sender, sendResponse);
    }
    if (message.type === 'getTabId') {
      sendResponse(sender.tab?.id);
    }
    return false;
  },
);

chrome.storage.local.clear();
