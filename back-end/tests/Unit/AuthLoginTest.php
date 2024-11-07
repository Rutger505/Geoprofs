<?php

namespace Tests\Unit;

use Tests\TestCase; // Extend the Laravel TestCase
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\Roles;
use App\Models\User;

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

    // public function test_invalid_creds(): void
    // {
    //     $response = $this->post('/api/auth/login', [
    //         'email' => 'john.doe@example.com',
    //         'password' => 'should be invalid'
    //     ]);

    //     $response->assertStatus(401);
    // }

    public function testInvalidCreds()
    {
        $request = new Request([
            'email' => 'john.doe@example.com',
            'password' => 'should be invalid'
        ]);

        $mockedController = $this->getMockBuilder(AuthController::class)
            ->onlyMethods(['login'])
            ->getMock();

        $mockedController->expects($this->once())
            ->method('login')
            ->with($this->equalTo($request));

        $mockedController->login($request);
    }

    // public function testValidCreds()
    // {


    //     $role = new Roles();
    //     $role->RoleName =  'testRole';
    //     $role->save();

    //     $user = new User();
    //     $user->UserFirstName = 'test';
    //     $user->UserLastName = 'test';
    //     $user->UserEmail = 'test@test.com';
    //     $user->UserPassword = 'test';
    //     $user->UserRoleID = 1;
    //     $user->save();


    //     $request = new Request([
    //         'email' => 'test@test.com',
    //         'password' => 'test'
    //     ]);

    //     $mockedController = $this->getMockBuilder(AuthController::class)
    //         ->onlyMethods(['login'])
    //         ->getMock();

    //     $mockedController->expects($this->once())
    //         ->method('login')
    //         ->with($this->equalTo($request));

    //     $mockedController->login($request);
    // }
}
