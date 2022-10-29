const kijiji = require('kijiji-scraper');
const validate = require('validate.js');

function main(args) {
  return new Promise((resolve, reject) => {
    const constraints = {
      location: {
        type: 'string',
        presence: { allowEmpty: false },
        inclusion: {
          within: ['montreal'],
          message: 'Kijiji Search is not available in %{value}',
        },
      },
      query: {
        type: 'string',
        presence: { allowEmpty: false },
      },
    };
    const validationErrors = validate(args, constraints, { format: 'flat' });
    if (validationErrors) {
      const err = `Payload is invalid: ${validationErrors.join(', ')}`;
      console.log(err);
      reject(new Error(err));
    }

    const params = {
      q: args.query,
      locationId: kijiji.locations.QUEBEC.GREATER_MONTREAL,
      adType: 'OFFERED',
    };
    const locationRegex = /([\p{L}\d\-!\s]{3,},\s?[A-Z]{2,})/gu;
    const results = [];

    kijiji.search(params).then((ads) => {
      ads.forEach((ad) => {
        const location = ad.attributes.location.match(locationRegex);
        if (ad.title && ad.attributes.price && location && ad.image && ad.url) {
          results.push({
            title: ad.title,
            price: ad.attributes.price.toString(),
            location: location.toString().trim(),
            coverImage: new URL(ad.image),
            link: new URL(ad.url),
          });
        }
      });
      resolve({ results });
    });
  });
}

global.main = main;
