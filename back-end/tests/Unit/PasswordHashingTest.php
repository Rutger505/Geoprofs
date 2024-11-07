<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class PasswordHashingTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function testPasswordHashing(): void
    {
        Hash::shouldReceive('make')
            ->once()
            ->with('testHash')
            ->andReturn('hashed_testHash');

        Hash::shouldReceive('check')
            ->once()
            ->with('testHash', 'hashed_testHash')
            ->andReturn(true);

        $hashTest = Hash::make('testHash');
        $testResult = Hash::check('testHash', $hashTest);

        $this->assertTrue(condition: $testResult);
    }
}
