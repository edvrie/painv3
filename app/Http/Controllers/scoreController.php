<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Review;
use App\Models\Scores;
use App\Models\User;
use Illuminate\Http\Request;

class scoreController extends Controller
{
    public function scoreDeleteLoad()
    {
        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN page!');
        }

        $Scores = Scores::all();

        foreach($Scores as $score)
        {
            $gameID = $score -> fk_GAMEid_GAME;
            $userID = $score -> fk_USERSid_USERS;
            $gameInfo = Game::all() -> where("id_GAME",$gameID) ->first();
            $userInfo = User::all() -> where("id_USERS",$userID) ->first();

            $score -> gameName = $gameInfo -> name;
            $score -> userName = $userInfo -> username;
        }
        $data = $Scores;
        return view('scoreViews/score',compact(array('data')));
    }

    public function scoreDelete(Request $request)
    {
        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN function!');
        }
        $ID = $request->input("id");

        Scores::where('id_SCORES','=',$ID)->delete();

        return redirect('/deleteScore')->with('success', 'Successfully deleted review');
    }

    public function postScore(Request $request)
    {
        $userID = session()->get('id');
        $gameID = $request->input("gameId");
        $score = $request->input("score");
        print($score);
        die();


        return redirect()->back();
    }
}
