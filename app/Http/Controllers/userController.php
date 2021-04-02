<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class userController extends Controller
{
    public function loginload()
    {
        return view('userViews/login');
    }

    public function registerload()
    {
        return view('userViews/register');
    }

    public function logout(Request $request){
        session()->forget('id');
        session()->forget('admin');
        return redirect('/')->with('success', 'Sėkmingai atsijungta!');
    }

    public function login(Request $request)
    {
        $ElPastas = $request->input("email");
        $Slaptazodis = $request->input("password");


        $data = Users::all()
            ->where("email",$ElPastas)
            ->first();



        if($data != null) {
            $gautas = $data->password;

            if ($gautas == $Slaptazodis) {
                session(['id'=>$data->id_USERS]);
                session(['admin'=>$data->isAdmin]);

                if($data->isAdmin == 1)
                {
                    $data->lastLoggedIn = Carbon::now();
                    $data->save();
                    die("Redirect to admin");
                }
                else
                {
                    $data->lastLoggedIn = Carbon::now();
                    $data->save();
                    return redirect('/')->with('success', 'Sėkmingai prisijungta!');
                }

            } else {
                return redirect('login')->with('danger', 'Neteisingi prisijungimo duomenys!');
            }
        }
        else {
            return redirect('login')->with('danger', 'Neteisingi prisijungimo duomenys!');
        }
    }

    public function registerNew(Request $request){

        $Email = $request->input("email");
        $Password = $request->input("password");
        $Username = $request->input("username");

        $rules = [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:5|max:255',
            'username' => 'required|string|min:5|max:255',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return redirect('register')
                ->withInput()
                ->withErrors($validator);
        }

        $AllUsers = Users::all();

        foreach($AllUsers as $user)
        {
            if($user->email == $Email)
            {
                return redirect('register')->with('danger', 'Pašto adresas jau panaudotas!');
            }
        }


        $User = new Users();

        $User->email = $Email;
        $User->password = $Password;
        $User->username = $Username;
        $User->isAdmin = 0;
        $User->creationDate = Carbon::now();
        $User->save();

        return redirect('/')->with('success', 'Sėkmingai priregistruota!');
    }

}
