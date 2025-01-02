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
                'totalLeaveHours' => 10
            ],
            [
                'name' => 'Goodbye Contract',
                'totalLeaveHours' => 5
            ],
            [
                'name' => 'Jake Contract',
                'totalLeaveHours' => 999
            ],
            [
                'name' => 'Rutger Contract',
                'totalLeaveHours' => 50
            ],
            [
                'name' => 'BOB Contract',
                'totalLeaveHours' => 1
            ]
        ]);
    }
}
