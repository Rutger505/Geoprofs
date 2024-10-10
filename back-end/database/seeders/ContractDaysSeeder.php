<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'ContractID' => 1,
                'DayID' => 1,
                'WorkStartHourDay' => '10:00:00',
                'WorkEndHourDay' => '17:00:00'
            ],
            [
                'ContractID' => 1,
                'DayID' => 3,
                'WorkStartHourDay' => '09:00:00',
                'WorkEndHourDay' => '17:00:00'
            ]
        ]);
    }
}
