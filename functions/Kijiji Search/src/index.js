/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/
const kijiji = require('kijiji-scraper');
const validate = require('validate.js');

module.exports = async function search(req, res) {
  const args = JSON.parse(req.payload);
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
    throw new Error(err);
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
    res.json(results);
  });
};
