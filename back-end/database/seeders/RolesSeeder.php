<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['name' => 'CEO'],
            ['name' => 'Employee'],
            ['name' => 'Admin'],
            ['name' => 'SectionManager'],
            ['name' => 'ProjectManager']
        ]);
    }
}
