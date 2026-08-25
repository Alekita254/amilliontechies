#!/usr/bin/env bash
set -e

NETWORK_NAME="g8-yatch_g8net"
CADDY_CONTAINER="g8-yatch-caddy-1"
CONTAINER_NAME="amilliontechies-frontend"
IMAGE_NAME="amilliontechies-frontend:latest"

echo "=========================================="
echo " Starting Main Frontend Deployment"
echo "=========================================="

# 1. Build locally
echo "--> Running local frontend build..."
npm run build

# 2. Package Docker Container
echo "--> Packaging Docker image..."
docker build -t $IMAGE_NAME .

# 3. Recreate Container
echo "--> Replacing container $CONTAINER_NAME..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

docker run -d \
  --name $CONTAINER_NAME \
  --network $NETWORK_NAME \
  --restart always \
  $IMAGE_NAME

# 4. Reload Caddy
echo "--> Reloading Caddy configuration..."
docker exec -it $CADDY_CONTAINER caddy reload --config /etc/caddy/Caddyfile

echo "=========================================="
echo " Main Frontend Deployment Complete!"
echo "=========================================="
