# Quecoin

A distributed, incentivized platform for asking and answering questions - MIT Blueprint 2018 3rd Place.

## Whitepaper

See [this Google Doc](https://docs.google.com/document/d/1SUYIcKfctowjjmqOM4c3Bq4D337DjCJDVFs9w4ppKbg/edit) for a rough, work-in-progress draft.

## Building

Requirements: npm.

1. `npm install`
2. Build contracts with `npm run truffle` and keep the `truffle develop` window open to run the test network.
3. `npm start` in another terminal window.

### Updating Contracts

1. `truffle compile`
2. `migrate` in development console
3. `npm run typechain`
