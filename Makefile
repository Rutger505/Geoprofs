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

ssl: proxy/ssl/localhost.pem

proxy/ssl/localhost.pem:
	-mkdir proxy/ssl
	cd proxy/ssl                 && \
	mkcert -install              && \
	mkcert localhost             && \
	echo SSL certificates generated
