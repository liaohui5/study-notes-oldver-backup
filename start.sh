#!/bin/bash

# update source codes
git pull origin master

# remove old container and image
docker stop studynotes
docker rm -f studynotes
docker rmi -f studynotes

## rebuild image && restart container
docker build . -t studynotes
docker run studynotes -dp 443:443 \
-v ./nginx/nginx.conf:/etc/nginx/nginx.conf \
-v ./nginx/cakeys:/etc/nginx/cakeys \
--name studynotes studynotes
