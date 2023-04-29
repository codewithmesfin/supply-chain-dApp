
# SupplyChain dApp

## Overview
This is a smart contract implemented in Solidity language for a simple supply chain system. It is based on the OpenZeppelin Ownable library and allows the owner to approve and ship items ordered by users.

## Usage
To use this smart contract, you can follow these steps:
1. Clone this repository using `git clone`.
2. Install the required dependencies by running `npm install`.
3. Compile the contract by running `npx hardhat compile`.
4. Test the contract using `npx hardhat test`. You can also generate a gas report by running `REPORT_GAS=true npx hardhat test`.
5. Start a local development network by running `npx hardhat node`.
6. Deploy the contract to your local network by running `npx hardhat run --network localhost scripts/deploy.ts`.

