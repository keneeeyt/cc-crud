<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name, // Explicitly return first_name
            'last_name' => $this->last_name,   // Explicitly return last_name
            'email' => $this->email,
            'contact_number' => $this->contact_number,
            'created_at' => $this->created_at,
            // Optionally include the full name if needed
            'name' => $this->first_name . ' ' . $this->last_name, 
        ];
    }
}
