<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PDO;

class CreateDatabase extends Command
{
    protected $signature = 'db:create';
    protected $description = 'Create PostgreSQL database if it doesn\'t exist';

    public function handle()
    {
        $database = config('database.connections.pgsql.database');

        $pdo = new PDO(
            sprintf(
                'pgsql:host=%s;port=%s;dbname=postgres',
                config('database.connections.pgsql.host'),
                config('database.connections.pgsql.port')
            ),
            config('database.connections.pgsql.username'),
            config('database.connections.pgsql.password')
        );

        // Check if database exists
        $stmt = $pdo->prepare("SELECT datname FROM pg_catalog.pg_database WHERE datname = ?");
        $stmt->execute([$database]);
        $exists = $stmt->fetchColumn();

        if (!$exists) {
            // Create database
            $pdo->exec(sprintf(
                'CREATE DATABASE %s',
                $database
            ));

            $this->info("Database '{$database}' created successfully.");
        } else {
            $this->info("Database '{$database}' already exists.");
        }
    }
}
