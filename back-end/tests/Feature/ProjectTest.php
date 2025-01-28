<?php

namespace Tests\Feature;

use Tests\TestCase;

class ProjectTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_getting_projects(): void
    {
        $response = $this->get('/api/projects');

        $response->assertStatus(200);
    }

    public function test_creating_project(): void
    {

        // Sample login credentials
        $credentials = [
            'name' => 'test',

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->postJson("api/projects", $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);

    }

    public function test_updating_project(): void
    {

        $projectId = 1;

        // Sample login credentials
        $credentials = [
            'name' => 'testUpdate',

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->putJson("api/projects/$projectId", $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);

    }

    public function test_deleting_project(): void
    {
        $projectId = 3;

        $response = $this->delete("api/projects/$projectId");


        $response->assertStatus(200);
    }


    public function test_gettings_users_from_projects(): void
    {
        $projectId = 1;

        $response = $this->get("/api/projects/users/$projectId");

        $response->assertStatus(200);
    }

    public function test_adding_user_to_project(): void
    {
        $credentials = [
            'userId' => 1,
            'projectId' => 2,
        ];

        $response = $this->postJson("/api/projects/users", $credentials);

        $response->assertStatus(200);
    }

    public function test_add_user_to_non_existing_project(): void
    {
        $credentials = [
            'userId' => 1,
            'projectId' => 0,
        ];

        $response = $this->postJson("/api/projects/users", $credentials);

        $response->assertStatus(404);
    }

    public function test_deleting_user_from_project(): void
    {
        $projectId = 2;

        $credentials = [
            'userId' => 1,
        ];

        $response = $this->delete("/api/projects/users/$projectId", $credentials);

        $response->assertStatus(200);
    }


    public function test_deleting_user_from_project_where_combination_not_exists(): void
    {
        $projectId = 0;

        $credentials = [
            'userId' => 1,
        ];

        $response = $this->delete("/api/projects/users/$projectId", $credentials);

        $response->assertStatus(400);
    }

    public function test_getting_leave_from_project(): void
    {
        $projectId = 1;

        $response = $this->get("/api/projects/leave/$projectId");
        $response->assertStatus(200);
    }
}
