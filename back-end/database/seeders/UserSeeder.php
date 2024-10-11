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
                'UserRoleID' => 1,
            ],
            [
                'UserFirstName' => 'Jane',
                'UserLastName' => 'Smith',
                'UserEmail' => 'jane.smith@example.com',
                'UserPassword' => Hash::make('password123'),
                'DateHired' => '2019-05-20',
                'UserRoleID' => 2,
            ],
            [
                'UserFirstName' => 'Jake',
                'UserLastName' => 'van de Kolk',
                'UserEmail' => 'jake.kolkh@example.com',
                'UserPassword' => Hash::make('jake'),
                'DateHired' => '2012-05-20',
                'UserRoleID' => 3,
            ],
            [
                'UserFirstName' => 'Rutger',
                'UserLastName' => 'Pronk',
                'UserEmail' => 'Rutger.Pronk@example.com',
                'UserPassword' => Hash::make('rutgerrr'),
                'DateHired' => '2023-09-20',
                'UserRoleID' => 4,
            ],
            [
                'UserFirstName' => 'Bob',
                'UserLastName' => 'Bobbers',
                'UserEmail' => 'bob.bobbers@example.com',
                'UserPassword' => Hash::make('bobbiebobbob'),
                'DateHired' => '2015-02-01',
                'UserRoleID' => 5,
            ],

        ]);
    }
}
