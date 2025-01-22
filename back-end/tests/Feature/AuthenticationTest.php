<?php

namespace Tests\Feature;

use Tests\TestCase;

class AuthenticationTest extends TestCase
{


    /**
     * @test
     */
    public function login(): void
    {
        // Sample login credentials
        $credentials = [
            'email' => 'employee@example.com',
            'password' => 'secret'
        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->postJson('api/auth/login', $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'id',
            'firstName',
            'lastName',
            'email',
            'roleId',
            'created_at',
            'updated_at',
            'registrationStatus',
            'roleName'
        ]);
    }

    /**
     * @test
     */
    public function invalid_login(): void
    {
        // Sample login credentials
        $credentials = [
            'email' => 'employee@example.com',
            'password' => 'wrong password'
        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->postJson('api/auth/login', $credentials);

        $response->assertStatus(401);
    }

    public function test_register(): void
    {

        $random = rand(1, 999);
        // Sample login credentials
        $credentials = [
            'firstName' => 'Employee',
            'lastName' => 'Employee',
            'email' => "test+$random@example.com",
            'dateHired' => '01-01-2000',
            'roleId' => 1,
            'contractId' => 1
        ];

//        // Send a POST request with credentials to the login endpoint
        $response = $this->postJson('api/auth/register', $credentials);

        $response->assertStatus(200);
    }

}
