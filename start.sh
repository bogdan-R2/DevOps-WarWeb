#!/bin/bash
docker swarm init
sleep 1
docker compose build
sleep 1
docker compose push
sleep 1
docker service create --name registry --publish published=5000,target=5000 registry:2  
sleep 1  
docker stack deploy -c docker-compose.yml war-help-stack
