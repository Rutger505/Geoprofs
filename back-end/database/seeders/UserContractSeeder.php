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
                'contractId' => 1,
                'userId' => 1,
                'startDate' => '2023-01-01',
                'endDate' => '2025-01-01'
            ],
            [
                'contractId' => 2,
                'userId' => 2,
                'startDate' => '2024-01-01',
                'endDate' => null
            ],
            [
                'contractId' => 3,
                'userId' => 3,
                'startDate' => '2023-01-01',
                'endDate' => '2025-01-01'
            ],
            [
                'contractId' => 4,
                'userId' => 4,
                'startDate' => '2024-01-01',
                'endDate' => null
            ],
            [
                'contractId' => 5,
                'userId' => 5,
                'startDate' => '2024-01-01',
                'endDate' => null
            ],
        ]);
    }
}
