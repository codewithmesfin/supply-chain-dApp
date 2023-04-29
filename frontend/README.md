

# SupplyChain dApp
This is a decentralized application (dApp) built on top of the Ethereum blockchain. The dApp is designed to help users track the status of items in a supply chain. The project was bootstrapped with Create React App and uses the ethers.js library to interact with the Ethereum network.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Getting Started
To run the project, first add a symbolic link to the smart contract's ABI file:

##### `ln -s ../../smart-contract/artifacts/contracts/SupplyChain.sol/SupplyChain.json node_modules/SupplyChain.json`

Then install the dependencies:

`npm install`
To start the development server, run:

`npm run start`
This will start the app in development mode on http://localhost:3000.


## Available Scripts
In the project directory, you can run:

`npm test`
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

`npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

`npm run eject`
Note: this is a one-way operation. Once you eject, you can’t go back!

## How to Use the dApp
The dApp has a simple user interface that allows users to order items, view the status of those items, and cancel orders.

To order a new item, enter the name of the item in the input field and click the "Order" button. This will send a transaction to the Ethereum network to create a new order.

To view the status of existing orders, the app queries the smart contract to get a list of all items and their status. The status of each item is displayed next to the item name in the list.

To cancel an order, click the "Cancel" button next to the item in the list. This will send a transaction to the Ethereum network to cancel the order.



