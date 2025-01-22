<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function getCustomers(Request $request)
    {
         // Retrieve all customers from the database
         $customers = Customer::all();

         // Return customers as a JSON response
         return response()->json($customers);
    }

}
