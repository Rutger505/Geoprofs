<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'UserFirstName' => 'John',
                'UserLastName' => 'Doe',
                'UserEmail' => 'john.doe@example.com',
                'UserPassword' => Hash::make('password123'),
                'DateHired' => '2020-01-15',
                'UserRoleID' => 1, // Assuming RoleID 1 exists
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'UserFirstName' => 'Jane',
                'UserLastName' => 'Smith',
                'UserEmail' => 'jane.smith@example.com',
                'UserPassword' => Hash::make('password123'),
                'DateHired' => '2019-05-20',
                'UserRoleID' => 2, // Assuming RoleID 2 exists
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
