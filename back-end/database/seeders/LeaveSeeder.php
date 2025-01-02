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
                'start_date' => '2024-11-01 09:00:00',
                'end_date' => '2024-11-15 18:00:00',
                'reason' => 'Ik zou graag een mooie vankatie in Griekenland willen vieren',
                'status' => 'pending',
                'category_id' => 1,
                'user_id' => 2
            ],
            [
                'start_date' => '2024-10-20 08:00:00',
                'end_date' => '2024-10-25 17:00:00',
                'reason' => 'K ben de baas jongen',
                'status' => 'denied',
                'category_id' => 2,
                'user_id' => 1
            ],
            [
                'start_date' => '2024-12-05 08:30:00',
                'end_date' => '2024-12-07 17:30:00',
                'reason' => 'Ik heb hoge koorst',
                'status' => 'pending',
                'category_id' => 2,
                'user_id' => 1
            ]
        ]);
    }
}
