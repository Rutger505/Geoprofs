<?php

namespace Tests\Feature;

use Tests\TestCase;

class UserTest extends TestCase
{


    /**
     * A basic feature test example.
     */
    public function test_hours(): void
    {
        $response = $this->get('api/user/1/hours');

        $response->assertStatus(200);
    }

}
