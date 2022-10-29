import { Product } from '@/types';

export default function parseProduct(pageUrl: Location, callback: (product: Product) => void) {
  const bodyHtml:string = document.body.innerHTML;
  const productRe = /id="productTitle"/;
  const productMatches = bodyHtml.match(productRe);
  if (productMatches && productMatches.length) {
    const product: Product = {
      url: new URL(pageUrl.href),
      name: '',
      price: '',
      keywords: [],
      coverImage: new URL('https://www.amazon.ca/favicon.ico'),
    };
    // Extract product name
    const elHeaderModel: Element | null = document.querySelector('tr.po-model_name');
    const elHeaderCategory: Element | null = document.querySelector('div.feature ul.a-unordered-list.a-horizontal.a-size-small li:last-child');
    const elHeaderName: Element | null = document.getElementById('productTitle');
    if (elHeaderModel
      && elHeaderModel.lastElementChild
      && elHeaderModel.lastElementChild.textContent) {
      product.name = elHeaderModel.lastElementChild.textContent.trim();
    } else if (elHeaderCategory && elHeaderCategory.textContent) {
      product.name = elHeaderCategory.textContent.trim();
    } else if (elHeaderName && elHeaderName.textContent) {
      const nameRe = /([\w\s]+)[,.(-_:]/;
      const nameMatches = elHeaderName.textContent.trim().match(nameRe);
      if (nameMatches && nameMatches.length) {
        product.name = nameMatches[1].trim();
      } else {
        throw new Error('Unable to extract product name');
      }
    } else {
      throw new Error('Unable to extract product name');
    }
    // Extract product brand
    const elHeaderBrand: Element | null = document.querySelector('tr.po-brand');
    if (elHeaderBrand
      && elHeaderBrand.lastElementChild
      && elHeaderBrand.lastElementChild.textContent) {
      product.keywords.push(elHeaderBrand.lastElementChild.textContent.trim());
    }
    // Extract price
    const elPrice: Element | null = document.querySelector('span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay .a-offscreen');
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
    const elGridImgs: NodeListOf<Element> = document.querySelectorAll('div.imgTagWrapper img');
    const src: string | null = elGridImgs[0].getAttribute('src');
    if (src) {
      product.coverImage = new URL(src);
      console.log(product);
    }
    callback(product);
  }
}
