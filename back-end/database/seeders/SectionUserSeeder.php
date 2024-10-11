<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectionUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('section_user')->insert([
            [
                'SectionID' => 1,
                'UserID' => 1,
            ],
            [
                'SectionID' => 2,
                'UserID' => 2,
            ]
        ]);
    }
}
