# gatsby-plugin-cryptowerk-blockchain

> This plugin is in _beta_ and not officially supported yet
>
> Feel free to open issues for any questions or ideas

Gatsbyjs plugin that uses the Cryptowerk blockchain-as-a-service (BaaS) to create an immutable seal on each build.

With these digital seals, the public folder from a gatsby build may now be matched to its original to verify proof
of integrity. Learn more in the [Cryptowerk developer portal](https://developers.cryptowerk.com/platform/index.jsp)  

When you run `gatsby build`, this plugin will hash and seal the content of the public folder. First by using [folder-hash](https://www.npmjs.com/package/folder-hash) and then calling Cryptowerk API to take care of writing to the blockchains of your choosing. In this version hashes are propagated upwards, the hash that is returned for a folder is generated over all the hashes of its children and only 1 hash if pushed to Cryptowerk and subsequently the blockchains of your choosing.

Here we have an example that will work with the default configuration of `gatsby new`

```sh
$ yarn add gatsby-plugin-cryptowerk-blockchain
```

## Quick start

1. Signup for a [Cryptowerk account](https://cryptowerk.com/?utm_source=github&utm_campaign=gatsby-plugin-cryptowerk-blockchain)  
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

# TODO A future version will:
1. pass Cryptowerk ALL of the leaf level hashes from Gatsby's public folder
2. generate a balance merkel tree with a single root hash that
3. write the root hash as a transaction to one or more blockchains.
4. Cryptowerk Seals are created for each file enabling data integrity to be verified quickly.
