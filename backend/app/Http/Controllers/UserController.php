<?php
/**
 * Created by PhpStorm.
 * User: tamir
 * Date: 5/31/2021
 * Time: 7:28 PM
 */

namespace App\Http\Controllers;

use App\Models\Roles;
use App\Models\RoleUser;
use Illuminate\Support\Facades\Hash;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function isAdmin()
    {
        $user = auth()->user();
        $userRole = Users::getUserRole($user->email);

        if ($userRole->role_name == 'admin') {
            return true;
        } else {
            return false;
        }
    }

    public function getAllUsers()
    {
        if (!$this->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $users = DB::select('SELECT us.user_id, us.firstName,us.lastName,us.email, ro.name as role_name, ru.role_id as roleId FROM users us LEFT JOIN role_user ru on ru.user_id = us.user_id LEFT JOIN roles ro on ro.role_id = ru.role_id');
        return response()->json($users);
    }

    public function getOneUser($userId)
    {
        return response()->json(Users::find($userId));
    }

    public function create(Request $request)
    {
        if (!$this->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $this->validate($request, [
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required',
                'roleId' => 'required'
            ]);

            $newUser = [
                'firstName' => $request->input('firstName'),
                'lastName' => $request->input('lastName'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ];

            $user = Users::create($newUser);

            $newUserToRole = [
                'user_id' => $user->user_id,
                'role_id' => $request->input('roleId'),
            ];

            RoleUser::create($newUserToRole);
            return response()->json($user, 201);
        } catch (\Exception $error) {
            return response()->json($error, 500);
        }
    }

    public function update($userId, Request $request)
    {
        if (!$this->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Users::findOrFail($userId);
        $user->firstName = $request->input('firstName');
        $user->lastName = $request->input('lastName');
        $user->email = $request->input('email');
        $user->save();

        $roleUser = RoleUser::where('user_id', $userId)->first();
        $roleUser->role_id = $request->input('roleId');
        $roleUser->save();

        return response()->json($user, 200);
    }

    public function delete($userId)
    {
        if (!$this->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Users::findOrFail($userId)->delete();
        RoleUser::where('user_id', $userId)->delete();
        return response('Deleted Successfully', 200);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required'
        ]);


        $credentials = $request->only(['email', 'password']);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = DB::select('SELECT us.user_id, us.firstName,us.lastName,us.email, ro.name as role_name FROM users us LEFT JOIN role_user ru on ru.user_id = us.user_id LEFT JOIN roles ro on ro.role_id = ru.role_id WHERE us.email = ?', [$request->input('email')]);
        return $this->respondWithToken($token, $user[0]);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     * @param  object $user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'user' => $user
        ]);
    }
}