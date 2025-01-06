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
                'firstName' => 'Employee',
                'lastName' => 'Example',
                'email' => 'employee@example.com',
                'password' => Hash::make('secret'),
                'dateHired' => '2015-02-01',
                'registrationStatus' => 'completed',
                'roleId' => 2,
            ],
            [
                'firstName' => 'SectionManager',
                'lastName' => 'Example',
                'email' => 'sectionmanager@example.com',
                'password' => Hash::make('secret'),
                'dateHired' => '2015-02-01',
                'registrationStatus' => 'completed',
                'roleId' => 4,
            ],
            [
                'firstName' => 'ProjectManager',
                'lastName' => 'Example',
                'email' => 'projectmanager@example.com',
                'password' => Hash::make('secret'),
                'dateHired' => '2015-02-01',
                'registrationStatus' => 'completed',
                'roleId' => 5,
            ],
            [
                'firstName' => 'CEO',
                'lastName' => 'Example',
                'email' => 'ceo@example.com',
                'password' => Hash::make('secret'),
                'dateHired' => '2015-02-01',
                'registrationStatus' => 'completed',
                'roleId' => 1,
            ],
            [
                'firstName' => 'Admin',
                'lastName' => 'Example',
                'email' => 'admin@example.com',
                'password' => Hash::make('secret'),
                'dateHired' => '2015-02-01',
                'registrationStatus' => 'completed',
                'roleId' => 3,
            ],
            [
                'firstName' => 'Jake',
                'lastName' => 'van de Kolk',
                'email' => 'jake.kolk@example.com',
                'password' => Hash::make('jake'),
                'dateHired' => '2012-05-20',
                'registrationStatus' => 'completed',
                'roleId' => 3,
            ],
        ]);
    }
}
