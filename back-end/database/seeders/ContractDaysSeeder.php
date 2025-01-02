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
                'contract_id' => 1,
                'day_id' => 1,
                'start_hour' => '10:00:00',
                'end_hour' => '17:00:00'
            ],
            [
                'contract_id' => 1,
                'day_id' => 3,
                'start_hour' => '09:00:00',
                'end_hour' => '17:00:00'
            ]
        ]);
    }
}
