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
                'sectionId' => 1,
                'userId' => 1,
            ],
            [
                'sectionId' => 2,
                'userId' => 2,
            ]
        ]);
    }
}
