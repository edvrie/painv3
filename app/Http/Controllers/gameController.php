<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Scores;
use App\Models\User;
use App\Models\Users;
use Illuminate\Http\Request;
use phpDocumentor\Reflection\Types\Null_;
use function PHPUnit\Framework\isEmpty;

class gameController extends Controller
{
    public function gameViewLoad($id)
    {
        $data = Game::all() -> where("name",$id) -> first();
        $javascript = "../js/".$id.".js";
        $data -> script = $javascript;

        $gameid= $data -> id_GAME;
        $scores = Scores::all() -> where("fk_GAMEid_GAME",$gameid);
//        print($data);
//        print($scores);

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
        return view('gameView',compact(array('data','scores')));
    }
}
