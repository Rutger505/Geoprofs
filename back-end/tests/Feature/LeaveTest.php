<?php

namespace Tests\Feature;

use Tests\TestCase;

class LeaveTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_leave_creation(): void
    {
        // Sample login credentials
        $credentials = [
            'startDate' => '01-01-2000',
            'endDate' => '02-12-2000',
            'reason' => 'test',
            'categoryId' => 2,
            'userId' => 1,
        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->postJson('api/leave', $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);
    }

    public function test_empty_leave_creation(): void
    {
        $credentials = [

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->postJson('api/leave', $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(422);

    }

    public function test_get_leave_requests(): void
    {
        $userId = 1;

        $response = $this->get("api/leave/$userId");

        $response->assertStatus(200);

        // Assert that the response is an array of objects with the given structure
        $response->assertJsonStructure([
            '*' => [
                'id',
                'startDate',
                'endDate',
                'reason',
                'status',
                'categoryId',
                'userId',
                'created_at',
                'updated_at',
                'category' => [
                    'id',
                    'name',
                    'isPaidLeave',
                    'created_at',
                    'updated_at',
                ]
            ]
        ]);
    }

    public function test_get_leave_request_without_user(): void
    {
        $userId = 0;
        $response = $this->get("api/leave/$userId");

        $response->assertStatus(404);
    }

    public function test_leave_update(): void
    {


        $leaveId = 1;
        // Sample login credentials
        $credentials = [
            'status' => 'accepted',

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->putJson("api/leave/$leaveId", $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);

    }

    public function test_update_already_accepted_leave(): void
    {

        $leaveId = 1;
        // Sample login credentials
        $credentials = [
            'status' => 'accepted',

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->putJson("api/leave/$leaveId", $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(404);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);
    }

    public function test_update_non_existent_leave(): void
    {
        $leaveId = 0;

        $credentials = [
            'status' => 'accepted',

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->putJson("api/leave/$leaveId", $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(404);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);
    }


}
