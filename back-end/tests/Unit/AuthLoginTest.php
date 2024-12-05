<?php

namespace Tests\Unit;

use Tests\TestCase; // Extend the Laravel TestCase
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Roles;
use App\Models\User;

/**
 * @test
 */
class AuthLoginTest extends TestCase
{
    use RefreshDatabase;
    public function testInvalidCreds()
    {
        $response = $this->post('/api/auth/login', [
            'email' => 'test.doe@example.com',
            'password' => 'bababoei'
        ]);

        $response->assertStatus(302);
    }


    public function testValidCreds()
    { //mock database kijken
        $role = Roles::create(['RoleName' => 'testRole']);

        $user = User::create([
            'UserFirstName' => 'test',
            'UserLastName' => 'test',
            'email' => 'test@test.com',
            'password' => 'test',
            'UserRoleID' => 1,
        ]);

        $response = $this->post('/api/auth/login', [
            'email' => 'test@test.com',
            'password' => 'test'
        ]);

        $response->assertStatus(204);
        $this->assertAuthenticatedAs($user);
    }
}
