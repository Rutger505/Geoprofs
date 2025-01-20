<?php

namespace Tests\Feature;

use Tests\TestCase;

class RolesTest extends TestCase
{


    /**
     * A basic feature test example.
     */
    public function test_roles(): void
    {
        $response = $this->get('api/roles/show');

        $response->assertStatus(200);
    }

}
