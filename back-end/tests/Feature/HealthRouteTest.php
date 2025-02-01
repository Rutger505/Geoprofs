<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthRouteTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_health(): void
    {
        $response = $this->get('api/health');

        $response->assertStatus(200);
    }
}
