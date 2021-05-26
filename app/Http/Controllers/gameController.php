<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Users;
use Illuminate\Http\Request;

class gameController extends Controller
{
    public function gameViewLoad($id)
    {
        $javascript = "../js/".$id.".js";
        $data = new Game();
        $data -> name = $javascript;
        return view('gameView',compact(array('data')));
    }
}
