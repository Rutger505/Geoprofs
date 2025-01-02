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
                'first_name' => 'Employee',
                'last_name' => 'Example',
                'email' => 'employee@example.com',
                'password' => Hash::make('secret'),
                'date_hired' => '2015-02-01',
                'registration_status' => 'completed',
                'role_id' => 2,
            ],
            [
                'first_name' => 'SectionManager',
                'last_name' => 'Example',
                'email' => 'sectionmanager@example.com',
                'password' => Hash::make('secret'),
                'date_hired' => '2015-02-01',
                'registration_status' => 'completed',
                'role_id' => 4,
            ],
            [
                'first_name' => 'ProjectManager',
                'last_name' => 'Example',
                'email' => 'projectmanager@example.com',
                'password' => Hash::make('secret'),
                'date_hired' => '2015-02-01',
                'registration_status' => 'completed',
                'role_id' => 5,
            ],
            [
                'first_name' => 'CEO',
                'last_name' => 'Example',
                'email' => 'ceo@example.com',
                'password' => Hash::make('secret'),
                'date_hired' => '2015-02-01',
                'registration_status' => 'completed',
                'role_id' => 1,
            ],
            [
                'first_name' => 'Admin',
                'last_name' => 'Example',
                'email' => 'admin@example.com',
                'password' => Hash::make('secret'),
                'date_hired' => '2015-02-01',
                'registration_status' => 'completed',
                'role_id' => 3,
            ],
            [
                'first_name' => 'Jake',
                'last_name' => 'van de Kolk',
                'email' => 'jake.kolk@example.com',
                'password' => Hash::make('jake'),
                'date_hired' => '2012-05-20',
                'registration_status' => 'completed',
                'role_id' => 3,
            ],
        ]);
    }
}
