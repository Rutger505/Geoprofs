<?php

namespace Tests\Feature;

use Tests\TestCase;

class sectionTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_getting_sections(): void
    {
        $response = $this->get('/api/sections');

        $response->assertStatus(200);
    }

    public function test_creating_section(): void
    {

        // Sample login credentials
        $credentials = [
            'name' => 'test',

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->postJson("api/sections", $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);

    }

    public function test_updating_section(): void
    {

        $sectionId = 1;

        // Sample login credentials
        $credentials = [
            'name' => 'testUpdate',

        ];

        // Send a POST request with credentials to the login endpoint
        $response = $this->putJson("api/sections/$sectionId", $credentials);

        // Assert the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert the response body contains specific structure or data
        $response->assertJsonStructure([
            'message',
        ]);

    }

    public function test_deleting_section(): void
    {
        $sectionId = 3;

        $response = $this->delete("api/sections/$sectionId");


        $response->assertStatus(200);
    }


    public function test_gettings_users_from_sections(): void
    {
        $sectionId = 1;

        $response = $this->get("/api/sections/users/$sectionId");

        $response->assertStatus(200);
    }

    public function test_adding_user_to_section(): void
    {
        $credentials = [
            'userId' => 1,
            'sectionId' => 2,
        ];

        $response = $this->postJson("/api/sections/users", $credentials);

        $response->assertStatus(200);
    }
    

    public function test_deleting_user_from_section(): void
    {
        $sectionId = 2;

        $credentials = [
            'userId' => 1,
        ];

        $response = $this->delete("/api/sections/users/$sectionId", $credentials);

        $response->assertStatus(200);
    }


    public function test_deleting_user_from_section_where_combination_not_exists(): void
    {
        $sectionId = 0;

        $credentials = [
            'userId' => 1,
        ];

        $response = $this->delete("/api/sections/users/$sectionId", $credentials);

        $response->assertStatus(400);
    }

    public function test_getting_leave_from_section(): void
    {
        $sectionId = 1;

        $response = $this->get("/api/sections/leave/$sectionId");
        $response->assertStatus(200);
    }
}
