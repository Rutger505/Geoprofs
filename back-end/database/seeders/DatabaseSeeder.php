<?php

namespace Database\Seeders;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SectionSeeder::class,
            ProjectSeeder::class,
            DaysSeeder::class,
            RolesSeeder::class,
            ContractSeeder::class,
            UserSeeder::class,
            LeaveCategorySeeder::class,
            LeaveSeeder::class,
            UserContractSeeder::class,
            ContractDaysSeeder::class,
            SectionUserSeeder::class,
            ProjectUserSeeder::class,
        ]);
    }
}
