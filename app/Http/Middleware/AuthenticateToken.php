<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Check for the Authorization header
        $authorizationHeader = $request->header('Authorization');

        if (!$authorizationHeader) {
            return response()->json(['error' => 'Authorization header missing'], 401);
        }

        // Remove 'Bearer' prefix if present
        if (str_starts_with($authorizationHeader, 'Bearer ')) {
            $token = substr($authorizationHeader, 7);
        } else {
            $token = $authorizationHeader;
        }

        // Validate the token
        if ($token !== '123') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
