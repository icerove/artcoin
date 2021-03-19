import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as nearAPI from "near-api-js";
import getConfig from "./config";

// Initializing contract
async function initContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');
  window.near = nearAPI
  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore()
    },
    ...nearConfig
  });
  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in account data
  let currentUser;
  if(walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: [
                  'get_total_balance', 
                  'get_unstaked_balance', 
                  'get_staked_balance', 
                  'get_price', 
                  'get_asset_price',
                  'get_asset_balance'
                ],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: [
                    'stake_and_mint', 
                    'burn_to_unstake', 
                    'get_some_art',
                    'buy_asset_with_ausd',
                    'sell_asset_to_ausd',
                    'transfer',
                    'buy_art_with_near',
                    'buy_ausd_with_near'
                  ],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId()
  });

  const ausdContract = await new nearAPI.Contract(walletConnection.account(), 'ausd.artcoin.testnet', {
    // View methods are read-only – they don't modify the state, but usually return some value
    viewMethods: ['get_balance'],
    // Change methods can modify the state, but you don't receive the returned value when called
    changeMethods: [],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId()
  });

  return { contract, currentUser, nearConfig, walletConnection, ausdContract };
}

window.nearInitPromise = initContract()
  .then(({ contract, currentUser, nearConfig, walletConnection, ausdContract }) => {
    ReactDOM.render(
      <App
        ausdContract={ausdContract}
        contract={contract}
        currentUser={currentUser}
        nearConfig={nearConfig}
        wallet={walletConnection}
      />,
      document.getElementById('root')
    );
  });

