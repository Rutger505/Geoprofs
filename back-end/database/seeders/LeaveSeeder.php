<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class LeaveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('leave')->insert([
            [
                'startDate' => '2024-11-01 09:00:00',
                'endDate' => '2024-11-15 18:00:00',
                'reason' => 'Ik zou graag een mooie vankatie in Griekenland willen vieren',
                'status' => 'pending',
                'categoryId' => 1,
                'userId' => 2
            ],
            [
                'startDate' => '2024-10-20 08:00:00',
                'endDate' => '2024-10-25 17:00:00',
                'reason' => 'K ben de baas jongen',
                'status' => 'denied',
                'categoryId' => 2,
                'userId' => 1
            ],
            [
                'startDate' => '2024-12-05 08:30:00',
                'endDate' => '2024-12-07 17:30:00',
                'reason' => 'Ik heb hoge koorst',
                'status' => 'pending',
                'categoryId' => 2,
                'userId' => 1
            ]
        ]);
    }
}
