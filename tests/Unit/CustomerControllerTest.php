<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(); // Disable authentication middleware
    }

    /** @test */
    public function it_can_list_customers()
    {
        Customer::factory()->count(3)->create();

        $response = $this->getJson('/api/customers');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => ['id', 'first_name', 'last_name', 'email', 'contact_number']
                     ]
                 ]);
    }

    /** @test */
    public function it_can_create_a_customer()
    {
        $data = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'contact_number' => '+1234567890',
        ];

        $response = $this->postJson('/api/customers', $data);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Successfully created customer',
                     'data' => [
                         'first_name' => 'John',
                         'last_name' => 'Doe',
                         'email' => 'john.doe@example.com',
                     ],
                     'type' => 'success',
                 ]);

        $this->assertDatabaseHas('customers', ['email' => 'john.doe@example.com']);
    }

    /** @test */
    public function it_can_show_a_customer()
    {
        $customer = Customer::factory()->create();

        $response = $this->getJson("/api/customers/{$customer->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_update_a_customer()
    {
        $customer = Customer::factory()->create();

        $data = [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane.smith@example.com',
            'contact_number' => '+0987654321',
        ];

        $response = $this->putJson("/api/customers/{$customer->id}", $data);

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Successfully updated customer',
                     'type' => 'success',
                 ]);
    }

    /** @test */
    public function it_can_delete_a_customer()
    {
        $customer = Customer::factory()->create();

        $response = $this->deleteJson("/api/customers/{$customer->id}");

        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Successfully deleted customer',
                     'type' => 'success',
                 ]);
    }
}
