<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contracts')->insert([
            [
                'name' => 'Hallo Contract',
                'total_leave_hours' => 10
            ],
            [
                'name' => 'Goodbye Contract',
                'total_leave_hours' => 5
            ],
            [
                'name' => 'Jake Contract',
                'total_leave_hours' => 999
            ],
            [
                'name' => 'Rutger Contract',
                'total_leave_hours' => 50
            ],
            [
                'name' => 'BOB Contract',
                'total_leave_hours' => 1
            ]
        ]);
    }
}
