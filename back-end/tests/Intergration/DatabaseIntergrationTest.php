<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Roles;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DatabaseIntergrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function CrudTest()
    {

        $role = new Roles();
        $role->RoleName =  'testRole';
        $role->save();

        $user = new User();
        $user->UserFirstName = 'test';
        $user->UserLastName = 'test';
        $user->UserEmail = 'test@test.com';
        $user->UserPassword = 'test';
        $user->UserRoleID = 1;
        $user->save();



        // Act: Retrieve the user from the database
        $foundUser = User::where('UserEmail', 'test@test.com')->first();

        // Assert: Check if the retrieved user's details match
        $this->assertNotNull(actual: $foundUser);
        $this->assertEquals('test', $foundUser->UserFirstName);
        $this->assertEquals('test@test.com', $foundUser->UserEmail);

        $updateUser = User::find(1);
        $updateUser->UserFirstName = 'updatedtest';
        $updateUser->save();

        $updateTest = User::where('UserEmail', 'test@test.com')->first();

        $this->assertEquals('updatedtest', $updateTest->UserFirstName);

        $deletedUser = User::find(1);
        $deletedUser->delete();

        $deleteTest = User::find(1);
        $this->assertNull($deleteTest);
    }
}
