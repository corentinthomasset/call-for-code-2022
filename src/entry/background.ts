import _ from 'lodash';
import { Product, Search } from '@/types';
import searchMarketplaces from '@/scripts/searchMarketplaces';
import MessageSender = chrome.runtime.MessageSender;

const activeTabs: Set<number> = new Set();

function searchHandler(
  product: Product,
  sender:MessageSender,
  sendResponse:(resultsCount: number) => void,
): boolean {
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
      chrome.storage.local.set({ history }).catch((err) => {
        console.error(`Failed to update local storage with error: ${err}`);
      });
    });
    sendResponse(results.length);
    if (sender.tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        files: ['app.js'],
      }).catch((err) => {
        console.error(`Failed to execute content script with error: ${err}`);
      });
      activeTabs.add(sender.tab.id);
    }
  }).catch((err) => {
    console.warn(`Error while searching marketplaces: ${err}.\nNo results were returned.`);
    sendResponse(0);
  });
  return true;
}

chrome.runtime.onMessage.addListener(
  (message, sender:MessageSender, sendResponse:(payload:any) => void) => {
    if (message?.type === 'search') {
      return searchHandler(message.payload, sender, sendResponse);
    }
    if (message?.type === 'getTabId') {
      sendResponse(sender.tab?.id);
    }
    if (message?.type === 'incrementScore') {
      chrome.tabs.query({}, (tabs) => tabs.forEach((tab) => {
        if (tab.id && activeTabs.has(tab.id) && tab.id !== sender.tab?.id) {
          chrome.tabs.sendMessage(tab.id, message);
        }
      }));
    }
    sendResponse(true);
    return false;
  },
);

const historyStateUpdateHandler = _.debounce((details) => {
  chrome.tabs.sendMessage(details.tabId, { type: 'historyStateUpdated' });
}, 1000);

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (!details.url.includes('chrome://')) {
    historyStateUpdateHandler(details);
  }
});

// chrome.storage.local.clear();
