include .env

all: up

up: ssl
	docker compose up --build --detach --remove-orphans --force-recreate

down:
	docker compose down --remove-orphans

restart: up # start already rebuilds and recreates the containers

shell-%:
	docker compose exec $* sh

ssl:
	@if not exist proxy\ssl\${DOMAIN}.pem (  \
		cd proxy\ssl &&                      \
		mkcert -install &&                   \
		mkcert ${DOMAIN} &&                  \
		echo SSL certificates generated.     \
	) else (                                 \
		echo SSL certificates already exist. \
	)
