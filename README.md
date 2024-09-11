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
Verify choco installation:
```bash
choco -v
```

If choco is installed correctely run:
```bash
choco install make
```

# Installation

1. Clone the repository
2. In the root of the project, copy the `.env.example` file to `.env` and fill in the necessary values

## Frontend

1. In the front-end directory, run `npm install` to install the dependencies

## Backend 

1. In the back-end directory, copy the `.env.example` file to `.env` and fill in the necessary values
2. In the root of the project, run `make` to build and start the containers
3. In the root of the project, get into a terminal in the back-end container by running `make shell-back-end`
4. In the back-end container terminal, run `composer install` to install dependencies
5. In the back-end container terminal, run `php artisan key:generate` to generate the application key
6. In the back-end container terminal, run `php artisan migrate` to create the database tables
7. In the back-end container terminal, run `php artisan db:seed` to seed the database
8. Exit the terminal session in the back-end container, run `exit`
9. In the root of the project, run `make restart` to apply the changes

## Troubleshooting

### Mkcert

If mkcert -install crashes due to permission issues. Start the terminal as administrator and run the command again.

# Starting the application

```bash
make
```

# Stopping the application

```bash
make down
```

# Restarting the application

```bash
make restart
```

# Shell to a container

Run the command with the container name you want to start a shell.

```bash
make shell-<container-name>
```

# Access the application

- Frontend: [http://localhost](http://localhost)
- Backend: [http://localhost:8000](http://localhost:8000)

# Information

## Backend

For running artisan commands, you can use the `make shell-back-end` command to get into the container and run the commands.
