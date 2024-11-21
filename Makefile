include .env

all: up

up: ssl
	docker compose up --watch --build --remove-orphans --force-recreate

up-%: ssl
	docker compose up --build --detach --remove-orphans --force-recreate $*

restart: up # start already rebuilds and recreates the containers

restart-%:
	$(MAKE) up-$*

down:
	docker compose down --remove-orphans

down-%:
	docker compose down --remove-orphans $*

shell-%:
	docker compose exec $* bash

ssl: proxy/ssl/${DOMAIN}.pem

proxy/ssl/%.pem:
	-mkdir proxy\ssl
	@if not exist proxy\ssl\$*.pem (       \
	   cd proxy\ssl                     && \
	   mkcert -install                  && \
	   mkcert $*                      	&& \
	   echo SSL certificates generated     \
	) else (                               \
	   echo SSL certificates already exist \
	)