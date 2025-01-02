<?php

namespace Database\Seeders;

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
                'projectId' => 1,
                'userId' => 1,
            ],
            [
                'projectId' => 2,
                'userId' => 2,
            ]
        ]);
    }
}
