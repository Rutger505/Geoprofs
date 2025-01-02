<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_contract')->insert([
            [
                'contract_id' => 1,
                'user_id' => 1,
                'start_date' => '2023-01-01',
                'end_date' => '2025-01-01'
            ],
            [
                'contract_id' => 2,
                'user_id' => 2,
                'start_date' => '2024-01-01',
                'end_date' => null
            ],
            [
                'contract_id' => 3,
                'user_id' => 3,
                'start_date' => '2023-01-01',
                'end_date' => '2025-01-01'
            ],
            [
                'contract_id' => 4,
                'user_id' => 4,
                'start_date' => '2024-01-01',
                'end_date' => null
            ],
            [
                'contract_id' => 5,
                'user_id' => 5,
                'start_date' => '2024-01-01',
                'end_date' => null
            ],
        ]);
    }
}
