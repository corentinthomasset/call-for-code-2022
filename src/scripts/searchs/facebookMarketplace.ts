import validate from 'validate.js';
import { Result } from '@/types';

export default async function search(query: string, location: string):Promise<string> {
  const constraints = {
    location: {
      type: 'string',
      presence: { allowEmpty: false },
      inclusion: {
        within: ['montreal', 'nyc'],
        message: 'Facebook Marketplace Search is not available in %{value}',
      },
    },
    query: {
      type: 'string',
      presence: { allowEmpty: false },
    },
  };
  const validationErrors = validate({ query, location }, constraints, { format: 'flat' });
  if (validationErrors) {
    const err = `Invalid arguments: ${validationErrors.join(', ')}`;
    console.log(err);
    throw new Error(err);
  }

  const results: Result[] = [];
  return new Promise((resolve, reject) => {
    fetch(`https://www.facebook.com/marketplace/${location}/search/?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-ch-prefers-color-scheme': 'light',
        'sec-ch-ua': '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'viewport-width': '2560',
      },
    }).then((response) => response.text()).then((data) => {
      const re = /"marketplace_search":(\{.*}),"marketplace_seo_page"/;
      const matches = data.match(re);
      if (matches) {
        const edges = JSON.parse(matches[1])?.feed_units?.edges;
        if (edges) {
          edges.forEach((e:any) => {
            if (e.node?.listing) {
              const { listing } = e.node;
              results.push({
                title: listing.marketplace_listing_title,
                price: listing.listing_price.amount,
                location: `${listing.location.reverse_geocode.city}, ${listing.location.reverse_geocode.state}`,
                coverImage: new URL(listing.primary_listing_photo.image.uri),
                link: new URL(`https://www.facebook.com/marketplace/item/${e.node.story_key}/`),
                rating: 0,
              });
            }
          });
        }
      }
      resolve(JSON.stringify(results));
    }).catch((err) => {
      reject(new Error(`Unable to fetch results from Facebook Marketplace. Request failed with error: ${err}`));
    });
  });
}
