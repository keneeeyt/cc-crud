<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Http\Resources\CustomerResource;
use Illuminate\Support\Facades\Validator;


class CustomerController extends Controller
{
    public function index(Request $request)
    {
         // Retrieve all customers from the database
         $customers =  Customer::orderBy('created_at', 'desc')->get();

         if($customers->count() > 0) {
                return CustomerResource::collection($customers);
            } else {
                return response()->json(['success' => false, 'message' => 'No customers found', 'data' => []], 200);
         }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'last_name' => ['required', 'string', 'min:2'],
            'first_name' => ['required', 'string', 'min:2'],
            'email' => ['required', 'email'],
            'contact_number' => ['required', 'regex:/^[+\d\s]+$/'],
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => $validator->errors(), 'type'=>'danger'], 200);
        }

        // Check if the email already exists
        $existingCustomer = Customer::where('email', $request->email)->first();
        if ($existingCustomer) {
            return response()->json(['success' => false, 'message' => 'Email already exists', 'type'=>'danger'], 200);
        }

        // Create a new customer
        $customer = Customer::create([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
        ]);

        // Return the created customer as a JSON response
        return response()->json([
            'message' => 'Successfully created customer',
            'data' => new CustomerResource($customer),
            'type' => 'success',
        ], 200);
    }

}
