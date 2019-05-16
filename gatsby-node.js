"use strict";
const fetch = require('node-fetch');
const queryString = require('query-string');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const { hashElement } = require('folder-hash');
const jsonfile = require('jsonfile')
const report = require('gatsby-cli/lib/reporter');


exports.onPostBuild = async function onPostBuild(nodeOptions, pluginOptions) {
  //  console.log(JSON.stringify({ nodeOptions, pluginOptions }, null, 2));
  report.info(`Cryptowerk-Blockchain plugin started`);
  if (pluginOptions.apiKey) {
    // Get all pages and content from site public folder then hash it
    //TODO create function to format multiple hashes instead of just top of tree and prep for the cryptowerk api call
      const xyz = await hashnow(pluginOptions.hashoutputfile);
      const createdSealID = await createSeal(xyz.hash, pluginOptions.apiKey, pluginOptions.outputfile);
  }
};

async function hashnow(hashoutputfile) {
  const options = {
      algo: 'sha256',       // see crypto.getHashes() for options
      encoding: 'hex',
      folders: { include: ['public'] },
      files: { include: ['*.*'] }
  };
  const hashTree = await hashElement('public', options);
  // console.log(` hashTree.hash ${hashTree.hash}\n`);
  report.info(`Cryptowerk-Blockchain plugin hashed contents of public folder ${hashTree.hash}`);
  if (hashoutputfile) {
    jsonfile.writeFileSync(hashoutputfile, hashTree, { spaces: 2 });
    report.info(`Cryptowerk-Blockchain plugin SealID stored: ${hashoutputfile}`);
  }

  return hashTree;
}

async function createSeal(hashforsealing, cwapikey, storesealhere) {
  const qstring = '?version=6&hashes=' + hashforsealing;
  // TODO Add name of site and other metadata about build
  const options = {
    headers: {
      "Accept": "application/json",
      "X-API-Key": cwapikey
    }
  };
  //  TODO add configuOptions for questry string then  const apiOptions = queryString.stringify(data);
  const apiUrl = `https://developers.cryptowerk.com/platform/API/v6/register?${qstring}`;
  // fetch(apiUrl)
  const response = await fetch(apiUrl, options)
    .then(res => res.json())
    .catch(error => {
      report.panic('sealing failed:', error);
      return console.error('sealing failed:', error);
    });
  jsonfile.writeFileSync(storesealhere, response, { spaces: 2 });
  report.info(`Cryptowerk-Blockchain plugin SealID stored: ${storesealhere}`);

  return response;
}
