<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ContractDaysSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('contract_days')->insert([
            [
                'contractId' => 1,
                'dayId' => 1,
                'startHour' => '10:00:00',
                'endHour' => '17:00:00'
            ],
            [
                'contractId' => 1,
                'dayId' => 3,
                'startHour' => '09:00:00',
                'endHour' => '17:00:00'
            ]
        ]);
    }
}
