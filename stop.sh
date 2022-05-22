#!/bin/bash
docker stack rm war-help-stack
sleep 1
docker service rm registry
sleep 1
docker swarm leave --force
