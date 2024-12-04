<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Http\Controllers\RegistrationController;

class RegistrationTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function Registration_Test(): void
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
}
