all: up

up:
	docker compose up --build --detach --remove-orphans --force-recreate

down:
	docker compose down --remove-orphans

restart: up # start already rebuilds and recreates the containers

shell-%:
	docker compose exec $* sh
