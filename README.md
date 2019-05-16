# gatsby-plugin-cryptowerk-blockchain

> This plugin is in _beta_ and not officially supported yet
>
> Feel free to open issues for any questions or ideas

Gatsbyjs plugin that uses the Cryptowerk blockchain-as-a-service (BaaS) to create an immutable seal on each build.

With these digital seals, the public folder from a gatsby build may now be matched to its original to verify proof
of integrity. Learn more in the [Cryptowerk developer portal](https://developers.cryptowerk.com/platform/index.jsp)  

When you run `gatsby build`, this plugin will hash and seal the content of the public folder. First by using [folder-hash](https://github.com/marc136/node-folder-hash)(https://www.npmjs.com/package/folder-hash) and then calling Cryptowerk API to take care of writing to the blockchains of your choosing.

Here we have an example that will work with the default configuration of `gatsby new`

```sh
$ yarn add gatsby-plugin-cryptowerk-blockchain
```

## Quick start

1. Signup for a [Cryptowerk account](https://cryptowerk.com/)  
```
Get free developer account: https://developers.cryptowerk.com/platform/portal/register.html?p=Trial
```
2. Add credentials to a .env file, which you won't commit, or set the environment variable before running `gatsby build`

```env
// .env.production
CRYPTOWERK_APIKEYS=XXX
```
3. Add the following to your project's gatsby-config.js file:
```js
// gatsby-config.js
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

....

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-cryptowerk-blockchain`, // add to bottom of plugins list after all data has been written to public folder
      options: { // For sealing you need the API Key and API Credential for your Cryptowerk.com account.
        apiKey: process.env.CRYPTOWERK_APIKEYS, // Concatenation of the API key and secret separated by a space.
        hashoutputfile: './public/hashtree.json', // Optional hash tree will be stored to this file
        outputfile: './public/cryptowerk_seal.json' // Where do you want the seal to be stored?
      }
    },
  ],
};
```

# Feedback

This is the very first version of the plugin and isn't yet officially supported. Please leave all your feedback in GitHub issues 😊
