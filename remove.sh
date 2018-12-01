#!/bin/sh

rm -f microtask@0.0.1.bna networkadmin.card

composer card delete -c admin@microtask
docker kill $(docker ps -q)

docker rm $(docker ps -aq)

docker rmi $(docker images dev-* -q)