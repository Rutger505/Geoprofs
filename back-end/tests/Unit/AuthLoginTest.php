<?php

namespace Tests\Unit;

use Tests\TestCase; // Extend the Laravel TestCase
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;
use App\Models\Roles;
use App\Models\User;

class AuthLoginTest extends TestCase
{
    use RefreshDatabase;
    public function testInvalidCreds()
    {
        $request = new LoginRequest([
            'email' => 'john.doe@example.com',
            'password' => 'should be invalid'
        ]);

        $mockedController = $this->getMockBuilder(AuthenticatedSessionController::class)
            ->onlyMethods(['store'])
            ->getMock();

        $mockedController->expects($this->once())
            ->method('store')
            ->with($this->equalTo($request));

        $mockedController->store($request);
    }

    public function testValidCreds()
    {


        $role = new Roles();
        $role->RoleName =  'testRole';
        $role->save();

        $user = new User();
        $user->UserFirstName = 'test';
        $user->UserLastName = 'test';
        $user->email = 'test@test.com';
        $user->password = 'test';
        $user->UserRoleID = 1;
        $user->save();

        $request = new LoginRequest([
            'email' => 'test@test.com',
            'password' => 'test'
        ]);

        $mockedController = $this->getMockBuilder(AuthenticatedSessionController::class)
            ->onlyMethods(['store'])
            ->getMock();

        $mockedController->expects($this->once())
            ->method('store')
            ->with($this->equalTo($request));

        $mockedController->store($request);
    }
}
