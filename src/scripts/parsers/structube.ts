import { Product } from '@/types';

export default function parseProduct(pageUrl: Location, callback: (product: Product) => void) {
  const bodyHtml:string = document.body.innerHTML;
  const productRe = /itemtype="http:\/\/schema\.org\/Product"/;
  const productMatches = bodyHtml.match(productRe);
  if (productMatches && productMatches.length) {
    const product: Product = {
      url: new URL(pageUrl.href),
      name: '',
      price: '',
      keywords: [],
      coverImage: new URL('https://www.ikea.com/global/en/images/ikea-logo.svg'),
    };
    // Extract product name
    const elHeaderTitle: Element | null = document.querySelector('ol[itemtype="https://schema.org/BreadcrumbList"] li:last-child');
    if (elHeaderTitle && elHeaderTitle.textContent) {
      product.name = elHeaderTitle.textContent;
    } else {
      throw new Error('Unable to extract product name');
    }
    // Extract product keywords
    const elHeaderDescription: Element | null = document.querySelector('ol[itemtype="https://schema.org/BreadcrumbList"] li:nth-last-child(2)');
    if (elHeaderDescription && elHeaderDescription.textContent) {
      product.keywords = elHeaderDescription.textContent.split(' ');
    }
    product.keywords.push('structube');
    // Extract price
    const elPrice: Element | null = document.querySelector('div[class*="productFullDetail-module-regularPrice"]');
    if (elPrice && elPrice.textContent) {
      const priceRe = /([\d,.]+)/;
      const priceMatches = elPrice.textContent.match(priceRe);
      if (priceMatches && priceMatches.length) {
        // eslint-disable-next-line prefer-destructuring
        product.price = priceMatches[1];
      } else {
        throw new Error('Unable to extract product price');
      }
    } else {
      throw new Error('Unable to extract product price');
    }
    // Extract coverImage
    const elGridImgs: NodeListOf<Element> = document.querySelectorAll('div[class*="zoomResourceImage-module-root"] img');
    const src: string | null = elGridImgs[0].getAttribute('src');
    if (src) {
      product.coverImage = new URL(src);
    }
    callback(product);
  }
}
