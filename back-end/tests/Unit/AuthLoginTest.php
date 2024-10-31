<?php

namespace Tests\Unit;

use Tests\TestCase; // Extend the Laravel TestCase
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class AuthLoginTest extends TestCase
{
    use RefreshDatabase, WithoutMiddleware;

    /**
     * A basic unit test example.
     */

    // public function test_valid_creds(): void
    // {
    //     $response = $this->post('/api/auth/login', [
    //         'email' => 'john.doe@example.com',
    //         'password' => 'password5'
    //     ]);

    //     $response->assertStatus(200);
    // }

    public function test_invalid_creds(): void
    {
        $response = $this->post('/api/auth/login', [
            'email' => 'john.doe@example.com',
            'password' => 'alkdjlkajfkea'
        ]);

        $response->assertStatus(401);
    }
}
