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
                'is_paid_leave' => true
            ],
            [
                'name' => 'Ziek',
                'is_paid_leave' => false
            ]
        ]);
    }
}
