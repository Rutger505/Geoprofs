<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
                'email' => 'john.doe@example.com',
                'password' => Hash::make('password5'),
                'DateHired' => '2020-01-15',
                'RegistrationStatus' => 'pending',
                'UserRoleID' => 1,
            ],
            [
                'UserFirstName' => 'Jane',
                'UserLastName' => 'Smith',
                'email' => 'jane.smith@example.com',
                'password' => Hash::make('password123'),
                'DateHired' => '2019-05-20',
                'RegistrationStatus' => 'pending',
                'UserRoleID' => 2,

            ],
            [
                'UserFirstName' => 'Jake',
                'UserLastName' => 'van de Kolk',
                'email' => 'jake.kolk@example.com',
                'password' => Hash::make('jake'),
                'DateHired' => '2012-05-20',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 3,

            ],
            [
                'UserFirstName' => 'Rutger',
                'UserLastName' => 'Pronk',
                'email' => 'Rutger.Pronk@example.com',
                'password' => Hash::make('rutgerrr'),
                'DateHired' => '2023-09-20',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 4,

            ],
            [
                'UserFirstName' => 'Bob',
                'UserLastName' => 'Bobbers',
                'email' => 'bob.bobbers@example.com',
                'password' => Hash::make('bobbiebobbob'),
                'DateHired' => '2015-02-01',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 5,

            ],
            [
                'UserFirstName' => 'CEO',
                'UserLastName' => 'Example',
                'email' => 'ceo@example.com',
                'password' => Hash::make('secret'),
                'DateHired' => '2015-02-01',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 1,

            ],
            [
                'UserFirstName' => 'Employee',
                'UserLastName' => 'Example',
                'email' => 'employee@example.com',
                'password' => Hash::make('secret'),
                'DateHired' => '2015-02-01',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 2,

            ],
            [
                'UserFirstName' => 'Admin',
                'UserLastName' => 'Example',
                'email' => 'admin@example.com',
                'password' => Hash::make('secret'),
                'DateHired' => '2015-02-01',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 3,

            ],
            [
                'UserFirstName' => 'SectionManager',
                'UserLastName' => 'Example',
                'email' => 'sectionmanager@example.com',
                'password' => Hash::make('secret'),
                'DateHired' => '2015-02-01',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 4,

            ],
            [
                'UserFirstName' => 'ProjectManager',
                'UserLastName' => 'Example',
                'email' => 'projectmanager@example.com',
                'password' => Hash::make('secret'),
                'DateHired' => '2015-02-01',
                'RegistrationStatus' => 'completed',
                'UserRoleID' => 5,

            ],
        ]);
    }
}
