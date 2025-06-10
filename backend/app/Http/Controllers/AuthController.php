<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Log::info('Register request received', ['request' => $request->all()]);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'employee',
        ]);

        if (!$user) {
            Log::error('User registration failed', ['email' => $validated['email']]);
            return response()->json(['error' => 'User registration failed'], 500);
        }
        $token = $user->createToken('auth_token')->accessToken;

        return response()->json(['user' => $user, 'access_token' => $token], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Log::info('User logged in', ['user_id' => $user->id, 'email' => $user->email]);
            $token = $user->createToken('auth_token')->plainTextToken;
            Log::info('Token created', ['user_id' => $user->id, 'token' => $token]);
            return response()->json(['user' => $user, 'access_token' => $token], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
