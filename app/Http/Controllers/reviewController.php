<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Review;
use App\Models\Scores;
use App\Models\User;
use App\Models\Users;
use Carbon\Carbon;
use Illuminate\Http\Request;
use function PHPUnit\Framework\isEmpty;

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

    public function leaveUserReview(Request $request)
    {
        $userID = session()->get('id');
        $gameID = $request->input("gameId");
        $Ivertinimas = $request->input("star");
        $Tekstas = $request->input("review");
        print($Ivertinimas);
        print($Tekstas);

        $review = Review::all() -> where("fk_GAMEid_GAME",$gameID) -> where("fk_USERSid_USERS",$userID) -> first();
        print($review);
        if($review == null)
        {
            if($Ivertinimas == "" && $Tekstas == "") {
                return redirect()->back();
            }
            else{
                $Review = new Review();
                $Review->rating = $Ivertinimas;
                $Review->description = $Tekstas;
                $Review->fk_USERSid_USERS = $userID;
                $Review->fk_GAMEid_GAME = $gameID;
                $Review->save();
            }
        }
        else {
            if($Ivertinimas != "")
            {
                $review->rating = $Ivertinimas;
            }
            if($Tekstas != "")
            {
                $review->description = $Tekstas;
            }
            $review->fk_USERSid_USERS = $userID;
            $review->fk_GAMEid_GAME = $gameID;
            $review->save();
        }

        return redirect()->back();
    }
}
