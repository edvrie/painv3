<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Users;
use App\Models\Scores;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function userDeleteload()
    {
        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN function!');
        }

        $data = Users::all() -> where("isAdmin",0);

        return view('userViews/userDelete',compact(array('data')));
    }

    public function userDelete(Request $request)
    {
        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN page!');
        }

        $id = $request->input('id');
        Review::where('fk_USERSid_USERS','=',$id)->delete();
        Scores::where('fk_USERSid_USERS','=',$id)->delete();
        Users::where('id_USERS','=',$id)->delete();

        return redirect('/deleteUser')->with('success', 'Successfully deleted user');
    }

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
        return redirect('/')->with('success', 'Successfully logged out!');
    }

    public function login(Request $request)
    {
        $ElPastas = $request->input("email");
        $Slaptazodis = $request->input("password");

        print("Pateko1");

        $data = Users::all()
            ->where("email",$ElPastas)
            ->first();

        if($data != null) {
            $gautas = $data->password;


            if (Hash::check($Slaptazodis, $gautas)) {
                session(['id'=>$data->id_USERS]);
                session(['admin'=>$data->isAdmin]);

                if($data->isAdmin == 1)
                {
                    $data->lastLoggedIn = Carbon::now();
                    $data->save();
                    return redirect('/')->with('success', 'Successfully logged in as ADMIN!');
                }
                else
                {
                    $data->lastLoggedIn = Carbon::now();
                    $data->save();
                    return redirect('/')->with('success', 'Successfully logged in!');
                }

            } else {
                return redirect('login')->with('danger', 'Wrong login information!');
            }
        }
        else {
            return redirect('login')->with('danger', 'Wrong login information!');
        }
    }

    public function registerNew(Request $request){

        $Email = $request->input("email");
        $UnhashedPassword = $request->input("password");
        $Username = $request->input("username");

        $Password = Hash::make($UnhashedPassword);

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
                return redirect('register')->with('danger', 'Email address is already in use!');
            }
        }

        foreach($AllUsers as $user)
        {
            if($user->username == $Username)
            {
                return redirect('register')->with('danger', 'Username is already in use!');
            }
        }

        $User = new Users();

        $User->email = $Email;
        $User->password = $Password;
        $User->username = $Username;
        $User->isAdmin = 0;
        $User->creationDate = Carbon::now();
        $User->save();

        return redirect('/')->with('success', 'Successfully registered!');
    }

    public function settingsLoad()
    {
        $ident = session()->get('id');

        $data = Users::all()
            ->where("id_USERS",$ident)
            ->first();

        return view('userViews/settings',compact(array('data')));
    }

    public function changeSettings(Request $request)
    {
        $ident = session()->get('id');

        $Username = $request->input("username");
        $Nickname = $request->input("nickname");
        $Email = $request->input("email");
        $Password = $request->input("password");


        $AllUsers = Users::all();
        foreach($AllUsers as $user)
        {
            if($user->nickname == $Nickname and $user->id_USERS != $ident or $user->username == $Nickname and $user->id_USERS != $ident)
            {
                return redirect('settings')->with('danger', 'Nickname is already in use!');
            }

            if($user->email == $Email and $user->id_USERS != $ident)
            {
                return redirect('settings')->with('danger', 'Email address is already in use!');
            }
        }

        $rules = [
            'username' => 'required|string|min:5|max:255',
            'email' => 'required|email|min:5|max:255',
            'password' => 'required|string|min:5|max:255',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return redirect('settings')
                ->withInput()
                ->withErrors($validator);
        }


        $User = Users::all()
            ->where("id_USERS",$ident)
            ->first();


        $User->email = $Email;
        $User->password = $Password;
        $User->username = $Username;
        $User->nickname = $Nickname;
        $User->save();

        return redirect('settings')->with('success', 'Successfully changed information!');
    }

    public function resetNickname()
    {
        $ident = session()->get('id');

        $User = Users::all()
            ->where("id_USERS",$ident)
            ->first();

        $User->nickname = null;
        $User->save();

        return redirect('settings')->with('success', 'Successfully reset Nickname!');
    }
}
