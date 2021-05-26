<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Review;
use App\Models\User;
use App\Models\Users;
use Illuminate\Http\Request;

class reviewController extends Controller
{
    public function reviewDeleteLoad()
    {
        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN page!');
        }

        $Reviews = Review::all();

        foreach($Reviews as $review)
        {
            $gameID = $review -> fk_GAMEid_GAME;
            $userID = $review -> fk_USERSid_USERS;
            $gameInfo = Game::all() -> where("id_GAME",$gameID) ->first();
            $userInfo = User::all() -> where("id_USERS",$userID) ->first();

            $review -> gameName = $gameInfo -> name;
            $review -> userName = $userInfo -> username;
        }
        $data = $Reviews;
        return view('reviewViews/review',compact(array('data')));
    }

    public function reviewDelete(Request $request)
    {
        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN function!');
        }
        $ID = $request->input("id");

        Review::where('id_REVIEW','=',$ID)->delete();

        return redirect('/deleteReview')->with('success', 'Successfully deleted review');
    }
}
