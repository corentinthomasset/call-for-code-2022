# ![Nearbuy](/images/nearbuy.png)

The online shopping experience makes it easy to buy new products, ignoring pre-loved alternatives. Consumers may be unaware of second-hand products available nearby and don’t have the reflex to look for them. Buying reused goods is the exception; we want to make it the norm by bringing local pre-loved alternatives to your online shopping with Nearbuy.

Nearbuy’s Chrome extension suggests alternative pre-loved products that are available nearby. It was designed to simplify the pre-loved buying experience and integrate ecological thinking into people’s online shopping process. It aims to increase products’ life, reduce packaging and lessen the environmental impacts of shipping. Our shopping assistant integrates seamlessly into the online shopping experience. 

## Supplementing online shopping with local pre-loved alternatives
![extension](/images/extension.png)

## Contents
- [Video](#video)
- [Description](#description)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Technology used](#technology-used)
- [Current Limitations](#current-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)
- [Acknoledgments](#acknowledgments)

## Video

## Description

The pandemic created an e-commerce surge out of necessity. According to the 2020 ARTS release, e-commerce sales increased by 43% in the first year of the pandemic. This year, worldwide e-commerce sales are estimated to reach $5 trillion, accounting for 20% of overall retail sales. While e-commerce allows users to buy goods from the comfort of their home, it also generates negative impacts such as a depletion of natural resources, and an increase of waste footprint and pollution. A study by Oceana found that Amazon generated 465 million pounds of plastic packaging waste in 2019. We created Nearbuy to encourage reuse opportunities, thus reducing the volume of and demand for materials that create the biggest waste footprint (plastics, electronics, textile). 

Nearbuy’s Chrome extension suggests alternative pre-loved products that are available nearby. It aims to increase products’ life, reduce packaging and lessen the environmental impacts of shipping. Our shopping assistant integrates seamlessly into the online shopping experience. When browsing on a shopping website, a notification will appear if similar pre-loved items can be found locally. Users can then review the suggestions and access the offers. Our solution is non-intrusive and user friendly.

Nearbuy has an educational section which explains with real-world statistics the ecological impacts and benefits of buying reused local goods. It aims to create a positive impact and raise awareness of ecological problems.

We also integrated a gamifying process to encourage consumers to look at alternatives. For each product that is clicked on, the user is rewarded with a seed. The number of seeds collected is displayed in the extension in the form of a virtual garden. The scope is to reward users based on the number of pre-loved alternatives they looked at, in order to build sustainable habits.

The purpose of the extension is not to force users to buy reused products. Some suggestions may not be what users are looking for. Nearbuy’s goal is to showcase existing local pre-loved alternatives that shoppers may not be aware of. Ultimately, it aims to slowly integrate ecological thinking into people’s online shopping process.

While there are existing applications and websites that sell reused goods, Nearbuy’s integration within the shopping platforms that sell new products would increase people’s awareness of pre-loved alternatives. It facilitates the search process and eases the buying experience for consumers. While companies can sponsor their new products with ads to increase their sales, the same isn’t done with reused goods. The Nearbuy extension fills the gap by giving visibility to local opportunities at lower prices.

Nearbuy simplifies the pre-loved buying experience and opens consumers’ minds to local alternatives. Shopping reused products shouldn’t be complicated. Adopt the Nearbuy reflex!

## Getting started
To run the project locally, follow these instructions:

### Pre-requisites

1. [Install Node and NPM](https://nodejs.org/en/download/)
2. Clone this repo

### Build the Extension

- Start a terminal in call-for-code-2020 directory.
- Execute command `npm install`.
- Execute `npm run build`.

### Run the Extension

- Go to `chrome://extensions/` and activate the `developer mode`
- Click on `Load unpacked` and provide the path of the `call-for-code-2020/dist` folder
- Go to a supported shopping site and browse for a product (for example: [Airpods on Amazon](https://www.amazon.ca/Apple-AirPods-Pro-2nd-Generation/dp/B0BDHWDR12?ref_=ast_sto_dp&th=1&psc=1), [Armchair on Ikea](https://www.ikea.com/ca/en/p/poaeng-armchair-birch-veneer-knisa-light-beige-s49306570/) or [Dining table on Structube](https://www.structube.com/en_ca/dina-extendable-acacia-wood-dining-table-180-cm-to-260-cm-22-43-03?pid=22888))

## Architecture

![architecture](/images/architecture.png)

1. The user navigates to a supported shopping site
1. Request is sent to search local marketplaces 
1. Kijiji search cloud function scrapes Kijiji website for results
1. Local marketplaces returns the products matching the search

## Technology used

- [IBM Cloud Functions](https://cloud.ibm.com/functions/)

## Current Limitations

Our solution has certain limitations at the moment:
- If no results from Facebook marketplace are shown, user must login to their Facebook account.
- Only Montreal, Canada location is supported ATM.

## Roadmap

Current Features:
- Integration with Ikea, Amazon and Structube
- Search products on Facebook Marketplace and Kijiji
- Kijiji search as serverless function on IBM Cloud Functions
- History of searches and alternatives
- Educational section
- Gamifying process using seeds

Features to Come:

## Contributing

- Fork the repository.
- Commit your changes to your fork.
- Submit a pull request.
- Handle any feedback before the request is merged.

## Authors

- Corentin Thomasset
- Aida Bumbu

## License

This project is licensed under the Apache 2 License - see the [LICENSE](/LICENSE) file for details.

## Acknowledgments

