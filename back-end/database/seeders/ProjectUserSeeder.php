<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('project_user')->insert([
            [
                'ProjectID' => 1,
                'UserID' => 1,
            ],
            [
                'ProjectID' => 2,
                'UserID' => 2,
            ]
        ]);
    }
}
