
# Create a decentralised supply chain tracking application

## Create a decentralised supply chain tracking application
1. Smart Contract
* Write a smart contract that implements a supply chain tracking system, with functions to
    * enable users to order new items,
    * enable users to cancel the ordered items, 
    * enable the admin to approve and update the items’ status as ordered, shipped, delivered, or cancelled, 
    * retrieve information about a particular item’s status in the supply chain.
* Also write tests using ethers.js (or any other library of your choice) that verifies the following cases:
    * only the admin can approve and update the status of an item
    * the correct status of item is reflected after updating it
2. Frontend or Script
* Create a basic frontend, which displays the items as serial numbers along with their status, and allows users to order new items and cancel the ordered items. Connect the smart contract with the frontend using Ethers.js.
OR
* Write a separate script with Ethers.js to interact with the smart contract functions.

Include a readme file


...............

## Project Setup
Clone the project from git

`git clone https://github.com/sciemesfin/supply-chain-dApp.git`


## 1. Frontend source code
This is a decentralized application (dApp) built on top of the Ethereum blockchain. The dApp is designed to help users track the status of items in a supply chain. The project was bootstrapped with Create React App and uses the ethers.js library to interact with the Ethereum network.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Getting Started
Navigate to the frontend project folder

#### `cd frontend`

Then install the dependencies:
`npm install`

To run the project, first add a symbolic link to the smart contract's ABI file:
##### `ln -s ../../smart-contract/artifacts/contracts/SupplyChain.sol/SupplyChain.json node_modules/SupplyChain.json`


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

* To order a new item, enter the name of the item in the input field and click the "Order" button. This will send a transaction to the Ethereum network to create a new order.

* To view the status of existing orders, the app queries the smart contract to get a list of all items and their status. The status of each item is displayed next to the item name in the list.

* To cancel an order, click the "Cancel" button next to the item in the list. This will send a transaction to the Ethereum network to cancel the order.

.................

## 2. Smart Contract source code

### Overview
This is a smart contract implemented in Solidity language for a simple supply chain system. It is based on the OpenZeppelin Ownable library and allows the owner to approve and ship items ordered by users.

### Usage

To use this smart contract, you can follow these steps:
* Navigate to the smart contract project folder, run `cd smart-contract`
* Install the required dependencies by running `npm install`.
* Compile the contract by running `npx hardhat compile`.
* Test the contract using `npx hardhat test`. You can also generate a gas report by running `REPORT_GAS=true npx hardhat test`.
* Start a local development network by running `npx hardhat node`.
* Deploy the contract to your local network by running `npx hardhat run --network localhost scripts/deploy.ts`.



