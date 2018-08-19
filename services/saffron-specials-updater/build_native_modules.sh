#!/bin/bash

set -e

# Run this inside the Docker Toolbox terminal on Windows
# to build native modules for Amazon Linux and deploy

# Build and run container
IMAGE_TAG="saffron-specials-updater"
# Bust the Docker cache right before the npm install step
CACHE_BUSTER=$(date +%Y-%m-%d:%H:%M:%S)
docker build --build-arg CACHE_BUSTER=$CACHE_BUSTER -t $IMAGE_TAG .
CONTAINER_ID=$(docker run -d $IMAGE_TAG | tr -d '\n')
echo "Image $IMAGE_TAG running in container $CONTAINER_ID!"

# Remove node_modules and replace with native
rm -rf node_modules
echo "Copying container node_modules to local directory... (this may take a minute)"
docker cp $CONTAINER_ID:tmp/node_modules ./node_modules

# Kill container
docker kill $CONTAINER_ID

echo "Success! Native node_modules copied."