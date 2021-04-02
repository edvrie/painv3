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
        $ElPastas = $request->input("pastoAdresas");
        $Slaptazodis = $request->input("slaptazodis");


        $data = Users::all()
            ->where("email",$ElPastas)
            ->first();

        print($data);

        if($data != null) {
            $gautas = $data->password;

            if ($gautas == $Slaptazodis) {
                session(['id'=>$data->id_USERS]);
                session(['admin'=>$data->isAdmin]);

                if($data->isAdmin == 1)
                {
                    die("Redirect to admin");
                }
                else
                {
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

        $ElPastas = $request->input("pastas");
        $Slaptazodis = $request->input("slaptazodis");

        $rules = [
            'pastas' => 'required|email|max:255',
            'slaptazodis' => 'required|string|min:5|max:255',
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return redirect('register')
                ->withInput()
                ->withErrors($validator);
        }

        die("Praejo");

        $vartotojai = Vartotojas::all();

        foreach($vartotojai as $pastas)
        {
            if($pastas->ElPastas == $ElPastas)
            {
                return redirect('register')->with('danger', 'Pašto adresas jau panaudotas!');
            }
        }

//          Vartotojas
        $vartotojas = new Vartotojas();
        $pirkejas = new Pirkejas();
        $krepselis = new Krepselis();

        $vartotojas->ElPastas = $ElPastas;
        $vartotojas->Slaptazodis = $Slaptazodis;
        $vartotojas->SukurimoData = Carbon::now();
        $vartotojas->Tipas = 3;
        $vartotojas->save();
        $vartotojoID = $vartotojas->id_Vartotojas;

        $pirkejas->fk_Vartotojasid_Vartotojas = $vartotojoID;
        $pirkejas->NaujienlaiskioPrenumerata = 0;
        $pirkejas->save();
        $pirkejoID = $pirkejas->id_Pirkejas;

        $krepselis->fk_Pirkejasid_Pirkejas = $pirkejoID;
        $krepselis->save();



        return redirect('/')->with('success', 'Sėkmingai priregistruota!');
    }

}
