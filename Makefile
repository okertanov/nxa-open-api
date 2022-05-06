##
## Copyright (c) 2021 - Team11. All rights reserved.
##

##
## Config
##

PROJECT_NAME=nxa-open-api
DOCKER_IMAGE_NAME=nxa-open-api

DOCKER_ENV_FILE=.env
DOCKER_COMPOSE_FILE=docker-compose.yml
DOCKER_COMPOSE_DEV_FILE=docker-compose-dev.yml
DOCKER_COMPOSE_PROD_FILE=docker-compose-prod.yml

##
## Default
##

all: build

##
## Local Infrastructure
##

build: install
	npm run build

install: node_modules

node_modules: package.json
	npm install

start:
	npm run start

start-dev:
	npm run start:dev

start-prod:
	npm run start:prod

test:
	npm run test

e2e:
	npm run test:e2e

clean:
	-@rm -rf ./dist

distclean: clean docker-clean
	-@rm -rf ./node_modules

##
## Docker Infrastructure
##

docker-build:
	docker-compose -f ${DOCKER_COMPOSE_FILE} build --parallel

docker-rebuild:
	docker-compose -f ${DOCKER_COMPOSE_FILE} build --parallel --no-cache --force-rm --pull

docker-start-dev:
	docker-compose -f ${DOCKER_COMPOSE_FILE} -f ${DOCKER_COMPOSE_DEV_FILE} up -d

docker-start-prod:
	docker-compose -f ${DOCKER_COMPOSE_FILE} -f ${DOCKER_COMPOSE_PROD_FILE} up -d

docker-stop:
	docker-compose -f ${DOCKER_COMPOSE_FILE} down --remove-orphans

docker-test:
	docker-compose -f ${DOCKER_COMPOSE_FILE} -f ${DOCKER_COMPOSE_DEV_FILE} run ${PROJECT_NAME} make test

docker-e2e:
	docker-compose -f ${DOCKER_COMPOSE_FILE} -f ${DOCKER_COMPOSE_DEV_FILE} run ${PROJECT_NAME} make e2e

docker-clean:
	docker-compose -f ${DOCKER_COMPOSE_FILE} rm -s -f -v

##
## Publish targets
##

HUB_REGISTRY_NAME=${PROJECT_NAME}
HUB_REGISTRY_USER=okertanov
HUB_REGISTRY_TOKEN=5bd37ac1-045d-4923-8c94-b0f9fbfbe19b

docker-publish: docker-build
	@echo ${HUB_REGISTRY_TOKEN} | docker login --username ${HUB_REGISTRY_USER} --password-stdin
	docker tag ${PROJECT_NAME}:latest ${HUB_REGISTRY_USER}/${HUB_REGISTRY_NAME}:latest
	docker push ${HUB_REGISTRY_USER}/${HUB_REGISTRY_NAME}:latest

.PHONY: all build install \
		start start-dev start-prod \
		test e2e \
		clean distclean \
		docker-build docker-rebuild docker-start-dev docker-start-prod docker-stop \
		docker-test docker-e2e \
		docker-clean docker-publish

.SILENT: clean docker-clean distclean
