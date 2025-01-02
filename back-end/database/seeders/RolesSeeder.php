<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Roles;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Roles::where('RoleID', 1)->exists()) {
            return;
        }
        DB::table('roles')->insert([
            [
                'RoleName' => 'CEO'
            ],
            [
                'RoleName' => 'Employee'
            ],
            [
                'RoleName' => 'Admin'
            ],
            [
                'RoleName' => 'SectionManager'
            ],
            [
                'RoleName' => 'ProjectManager'
            ]
        ]);
    }
}
