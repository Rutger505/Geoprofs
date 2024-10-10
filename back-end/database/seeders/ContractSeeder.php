<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'ContractName' => 'Hallo Contract',
                'ContractTotalLeaveHours' => '10:00:00'
            ],
            [
                'ContractName' => 'Goodbye Contract',
                'ContractTotalLeaveHours' => '05:00:00'

            ]
        ]);
    }
}
