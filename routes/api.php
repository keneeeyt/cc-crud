<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

// Route::get('/customers', [CustomerController::class, 'getCustomers'])->middleware('auth');
// Route::post('/customers/create', [CustomerController::class, 'createCustomer'])->middleware('auth');

Route::apiResource('customers', CustomerController::class)->middleware('auth');
