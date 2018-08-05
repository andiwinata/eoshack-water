# Overview
H2EOS demonstrates the eosio platform running a blockchain as a local single node test net with a simple DApp. H2EOS allows users to create water measurement readings.

H2EOS is based off the boilerplate https://github.com/EOSIO/eosio-project-boilerplate-simple.git

# Prerequisites

Make sure Docker and Node.js are installed

* Install Docker: https://docs.docker.com/docker-for-mac/install/
* Install Node.js: https://nodejs.org/en/

The DApp and eosio will occupy the ports 3000, 8888 and 9876. Make sure nothing else is already running on these ports.

Clone the repository:
```sh
git clone https://github.com/EOSIO/eosio-project-boilerplate-simple.git
```

The following guide assumes you are using macOS.

# Run the DApp

- Run `sh h2eos_start_docker.sh` in terminal
- Open new terminal, run `cd ./frontend && npm start`

For Demo purposes:
- In the `localhost:3000` press `PUSH DEVICE READING TO BLOCKCHAIN`, this will push mock data into blockchain
- Then to populate the data in the app press `GET DEVICE READING FROM BLOCKCHAIN`, this will pull data from blockchain into the app
- Now just type deviceId `1234` or `12345` in the `Retrieve your data`, then you will get the result stored in the blockchain