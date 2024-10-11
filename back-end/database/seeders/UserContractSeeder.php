<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'ContractID' => 1,
                'UserID' => 1,
                'ContractStartDate' => '2023-01-01',
                'ContractEndDate' => '2025-01-01'
            ],
            [
                'ContractID' => 2,
                'UserID' => 2,
                'ContractStartDate' => '2024-01-01',
                'ContractEndDate' => null
            ],
            [
                'ContractID' => 3,
                'UserID' => 3,
                'ContractStartDate' => '2023-01-01',
                'ContractEndDate' => '2025-01-01'
            ],
            [
                'ContractID' => 4,
                'UserID' => 4,
                'ContractStartDate' => '2024-01-01',
                'ContractEndDate' => null
            ],
            [
                'ContractID' => 5,
                'UserID' => 5,
                'ContractStartDate' => '2024-01-01',
                'ContractEndDate' => null
            ],

        ]);
    }
}
