<?php

namespace Database\Seeders;

use App\Models\Days;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DaysSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Days::where('DayID', 1)->exists()) {
            return;
        }

        DB::table('days')->insert([
            [
                'DayName' => 'Monday'
            ],
            [
                'DayName' => 'Tuesday'
            ],
            [
                'DayName' => 'Wednesday'
            ],
            [
                'DayName' => 'Thursday'
            ],
            [
                'DayName' => 'Friday'
            ],
            [
                'DayName' => 'Saturday'
            ],
            [
                'DayName' => 'Sunday'
            ],

        ]);
    }
}
