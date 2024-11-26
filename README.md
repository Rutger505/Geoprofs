# Geoprofs

# Dependencies

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- Make
- Mkcert

## Install make and mkcert for windows

Here are install instruction for installing make using choco.

If you have not installed choco already run the following command in a powershell with administrative rights:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```


If choco is installed correctely run:
```bash
choco install make
```
And
```bash
choco install mkcert
```


# Installation

1. Clone the repository
2. In the root of the project, copy the `.env.example` file to `.env` and fill in the necessary values

## Frontend

1. In the front-end directory, run `npm install` to install the dependencies

## Backend 

1. In the back-end directory, copy the `.env.example` file to `.env` and fill in the necessary values
2. In the back-end directory, run `composer install` to install dependencies
3. In the back-end directory, run `php artisan key:generate` to generate the application key
4. In the root directory run `make` to start the services (including the database) 
5. In the back-end directory, run `php artisan migrate` to create the database tables
6. In the back-end directory, run `php artisan db:seed` to seed the database

## Troubleshooting

### Mkcert

If mkcert -install crashes due to permission issues. Start the terminal as administrator and run the `make` command again.

# Makefile commands

## Starting the application
will build and start the restart the containers.

```bash
make (up)
``` 

## Stopping the application

```bash
make down
```

## Restarting the application

```bash
make restart
```

## Shell to a container

Run the command with the container name you want to start a shell.

```bash
make shell-<container-name>
```

# Access the application

- Frontend: [https://localhost](https://localhost)
- Backend: [https://localhost/api](https://localhost/api)

