# Kijiji Search
## 🤖 Documentation
Performs a Kijiji search for a given query and location. Returns an array of results. Returns an empty arry if no results.

_Example input:_

```json
{
  "query": "MALM, Bed frame, Queen, ikea",
  "location": "montreal"
}
```

_Example output:_

```json
{results: [
  {
    title: 'IKEA MALM Bed frame, black-brown, QUEEN',
    price: '189',
    location: 'Montréal, QC',
    coverImage: <URL>, 
    link: <URL>
  },
  {
    title: 'Ikea Queen size Malm bed frame',
    price: '180',
    location: 'Montreal, QC',
    coverImage: <URL>, 
    link: <URL>
  }
]}
```

## 🚀 Deployment

Kijiji Search is packaged using webpack module and deployed as an IBM Cloud Functions action.
Build Kijiji Search function to generate the bundle.js in the dist folder:

```console
cd ./functions/Kijiji\ Search/
npm install
npm run build
```
There are two ways of deploying IBM Cloud Functions action: using the UI or CLI. 

### Using CLI

Make sure you have [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cli-getting-started) installed, and you have successfully logged into your IBM Cloud with your IBMid.

Make sure you are the _Kijiji Search_ folder and run `ibmcloud fn action create kijiji-search dist/bundle.js --kind nodejs:16  --web true` to deploy your function.

To get the URL, run `ibmcloud fn action get kijiji-search --url`

To update the function, run `ibmcloud fn action update kijiji-search dist/bundle.js --kind nodejs:16`

### Manual using UI

Manual deployment has no requirements and uses IBM Cloud. Go to `https://cloud.ibm.com/functions/create/action`. Give a reprensentative name to you action (e.g.: kijiji-search) and select `Node.js 16` runtime. Replace the code with the content of `./dist/bundle.js`. 
For testing, click on `invoke with parameters` and put the json _example input_ provided earlier. Click `Invoke`. You should see a similar output as the json _example output_. In the _Endpoints_ section, select `enable as Web Action`. This will allow to send API requests to the function.

## Test

URL encode the _Example input_ JSON, and provide it as _payload_ parameter to the URL.

```console
$ curl -X POST https://us-east.functions.appdomain.cloud/api/v1/web/<id>/default/kijiji-search.json?payload=%7B%22query%22%3A%22MALM%2C%20Bed%20frame%2C%20Queen%2C%20ikea%22%2C%22location%22%3A%22montreal%22%7D
```
