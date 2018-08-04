#!/usr/bin/env bash

# # make sure everything is clean and well setup
./first_time_setup.sh

# # start blockchain and put in background test
./start_eosio_docker.sh --nolog

# start frontend react app
./start_frontend.sh
