#!/bin/sh

composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile microtask@0.0.1.bna

composer network start --networkName microtask --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@microtask

composer archive create --sourceType dir --sourceName . -a microtask@0.0.1.bna 