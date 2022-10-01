import { Product } from '@/types';

export default function parseProduct(pageUrl: Location) {
  const urlRe = /\/p\/(.*)\//;
  const urlMatches = pageUrl.pathname.match(urlRe);
  if (urlMatches && urlMatches.length) {
    const product: Product = {
      url: pageUrl.href,
      name: '',
      brand: 'ikea',
      description: '',
      price: '',
      keywords: [],
      images: [],
    };
    // Extract product name
    const elHeaderTitle: Element | null = document.querySelector('h1.pip-header-section .pip-header-section__title--big');
    if (elHeaderTitle && elHeaderTitle.textContent) {
      product.name = elHeaderTitle.textContent.trim();
    } else {
      throw new Error('Unable to extract product name');
    }
    // Extract product description
    const elHeaderDescription: Element | null = document.querySelector('h1.pip-header-section .pip-header-section__description');
    if (elHeaderDescription) {
      const hiddenElements: NodeListOf<Element> = elHeaderDescription.querySelectorAll('*[hidden]');
      hiddenElements.forEach((el) => {
        el.remove();
      });
    }
    if (elHeaderDescription && elHeaderDescription.textContent) {
      product.description = elHeaderDescription.textContent;
    } else {
      throw new Error('Unable to extract product description');
    }
    // Extract price
    const elPrice: Element | null = document.querySelector('.pip-temp-price__sr-text');
    if (elPrice && elPrice.textContent) {
      const priceRe = /([\d,.]+)/;
      const priceMatches = elPrice.textContent.match(priceRe);
      if (priceMatches && priceMatches.length) {
        // eslint-disable-next-line prefer-destructuring
        product.price = priceMatches[0];
      } else {
        throw new Error('Unable to extract product price');
      }
    } else {
      throw new Error('Unable to extract product price');
    }
    // Extract product images
    const elGridImgs: NodeListOf<Element> = document.querySelectorAll('.pip-media-grid__grid img');
    elGridImgs.forEach((el) => {
      const src: string | null = el.getAttribute('src');
      if (src) {
        product.images.push(src);
      }
    });
    return product;
  }
  return null;
}
