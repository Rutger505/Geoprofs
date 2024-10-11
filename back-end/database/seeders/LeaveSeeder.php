<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
                'LeaveStartDate' => '2024-11-01 09:00:00',
                'LeaveEndDate' => '2024-11-15 18:00:00',
                'LeaveReason' => 'Ik zou graag een mooie vankatie in Griekenland willen vieren',
                'Status' => 'pending',
                'LeaveCategory' => 1,
                'UserID' => 2

            ],
            [
                'LeaveStartDate' => '2024-10-20 08:00:00',
                'LeaveEndDate' => '2024-10-25 17:00:00',
                'LeaveReason' => 'K ben de baas jongen',
                'Status' => 'denied',
                'LeaveCategory' => 2,
                'UserID' => 1
            ],
            [
                'LeaveStartDate' => '2024-12-05 08:30:00',
                'LeaveEndDate' => '2024-12-07 17:30:00',
                'LeaveReason' => 'Ik heb hoge koorst',
                'Status' => 'pending',
                'LeaveCategory' => 2,
                'UserID' => 1

            ]
        ]);
    }
}
