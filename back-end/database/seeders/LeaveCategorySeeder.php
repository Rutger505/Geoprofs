<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class LeaveCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('leave_category')->insert([
            [
                'name' => 'Vakantie',
                'isPaidLeave' => true
            ],
            [
                'name' => 'Ziek',
                'isPaidLeave' => false
            ]
        ]);
    }
}
