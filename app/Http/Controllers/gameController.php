<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Review;
use App\Models\Scores;
use App\Models\User;
use App\Models\Users;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Null_;
use function PHPUnit\Framework\isEmpty;

class gameController extends Controller
{
    public function changeGameDescriptionLoad(){
        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN page!');
        }

        $data = Game::all();

        return view('descViews/gameDescriptions',compact(array('data')));
    }

    public function changeGameDescription(Request $request){

        if(session()->get('admin')!=1)
        {
            return redirect('/')->with('danger', 'Trying to access an ADMIN function!');
        }

        $gameID = $request->input("id");
        $description = $request->input("description");

        $Game = Game::all() -> where("id_GAME",$gameID) ->first();

        $Game->description = $description;
        $Game->save();

        $data = Game::all();
        return view('descViews/gameDescriptions',compact(array('data')));
    }

    public function gameViewLoad($id)
    {
        $data = Game::all() -> where("name",$id) -> first();
        $javascript = "../js/".$id.".js";
        $data -> script = $javascript;

        $gameid= $data -> id_GAME;
        $scores = Scores::all() -> where("fk_GAMEid_GAME",$gameid) -> sortBy('date')-> sortByDesc('score');
        $comments = Review::all() -> where("fk_GAMEid_GAME",$gameid);

        // RATING APSKAICIAVIMAS
        $RatingChange = Game::all() -> where("id_GAME",$gameid)->first();
        $AllGameReviews = Review::all() -> where("fk_GAMEid_GAME",$gameid);
        $sum = 0;
        $kel = 0;

        foreach($AllGameReviews as $rew)
        {
            if($rew -> rating != "")
            {
                $sum = $sum + $rew -> rating;
                $kel = $kel + 1;
            }
        }
        if($kel != 0)
        {
            $sum = floor($sum / $kel);
        }
        else{
            $sum = 0;
        }
        $RatingChange->rating = $sum;
        $RatingChange->save();

        foreach($scores as $score)
        {
            $userID = $score -> fk_USERSid_USERS;
            $userInfo = User::all() -> where("id_USERS",$userID) ->first();
            $nickname = $userInfo -> nickname;
            $username = $userInfo -> username;

            if($nickname == "")
            {
                $score -> userName = $username;
            }
            else
            {
                $score -> userName = $nickname;
            }
        }

        foreach($comments as $comment)
        {
            $userID = $comment -> fk_USERSid_USERS;
            $userInfo = User::all() -> where("id_USERS",$userID) ->first();
            $nickname = $userInfo -> nickname;
            $username = $userInfo -> username;

            if($nickname == "")
            {
                $comment -> userName = $username;
            }
            else
            {
                $comment -> userName = $nickname;
            }
        }
        return view('gameView',compact(array('data','scores','comments')));
    }
}
