<?php

namespace Database\Seeders;

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
                'section_id' => 1,
                'user_id' => 1,
            ],
            [
                'section_id' => 2,
                'user_id' => 2,
            ]
        ]);
    }
}
