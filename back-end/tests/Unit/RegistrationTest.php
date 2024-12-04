<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Http\Request;

use App\Http\Controllers\RegistrationController;

class RegistrationTest extends TestCase
{

    /**
     * @test
     */
    public function CreateUserTest(): void
    {

        $request = new Request([
            'email' => 'vandekolkjake@gmail.com',
            'password' => 'should be invalid'
        ]);

        $mockedController = $this->getMockBuilder(RegistrationController::class)
            ->onlyMethods(['adminRegister'])
            ->getMock();

        $mockedController->expects($this->once())
            ->method('adminRegister')
            ->with($this->equalTo($request));

        $mockedController->adminRegister($request);
    }
}
