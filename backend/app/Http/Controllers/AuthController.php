<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function user(){
        $user = request()->user();
        return response()->json([
            'status' => true,
            'data' => $user
        ]);
    }

    public function register(Request $request)
    {
        $user = new User();
        $validate = [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'isAdmin' => '',
        ];

        $validator = Validator::make($request->all(), $validate);
        if ($validator->fails()) {
            return response()->json([
                'Status' => false,
                'Message' => 'Validation Process Failed',
                'data' => $validator->errors()
            ], 401);
        }

        $name = $user->name = $request->name;
        $email = $user->email = $request->email;
        $isAdmin = $user->isAdmin = $request->isAdmin;
        $password = $user->password = Hash::make($request->password);
        $user->save();

        $data = [
            'Name' => $name,
            'Email' => $email,
            'Password' => $password,
            'isAdmin' => $isAdmin
        ];

        return response()->json([
            'Status' => true,
            'Message' => 'Validation Process Success',
            'data' => $data
        ], 200);

    }

    public function login(Request $request)
{
    $validate = [
        'email' => 'required|email',
        'password' => 'required',
    ];

    $validator = Validator::make($request->all(), $validate);
    if ($validator->fails()) {
        return response()->json([
            'Status' => false,
            'Message' => 'Login Failed',
            'data' => $validator->errors()
        ], 401);
    }

    if (!Auth::attempt($request->only(['email', 'password']))) {
        return response()->json([
            'Status' => false,
            'Message' => 'Please check your email and password clearly!',
        ]);
    }

    $user = Auth::user();

    return response()->json([
        'Status' => true,
        'Message' => 'Login Success',
        'Data' => $user,
        'isAdmin' => $user->isAdmin,
        'token' => $user->createToken('api-auth')->plainTextToken,
    ]);
}

    public function logout(Request $request)
    {

        $data = $request->user();
        if ($data) {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'status' => true,
                'Message' => "Logout Successfully",
                'Data' => $data
            ], 200);
        } else {
            return response()->json([
                "message" => "Logout failed"
            ], 404);
        }

    }

}
