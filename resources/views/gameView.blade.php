@extends('layout')

@section('content')

    <div class="container">  {{--canvas --}}
       <div class="row">
           <canvas id="gameCanvas" style="width: 100%; text-align: center; display: inline; border: solid #1a202c 5px; margin-top: 5px">
           </canvas>
       </div>
        <div class="row" style="margin-top: 10px">
            <div class="col-6" style="border: solid #1a202c 5px">
                Apie zaidima
            </div>
            <div class="col-1" style="border: solid #1a202c 5px; margin-left: 5px">
                Rate
            </div>
        </div>
        <div class="row" style="border: solid #1a202c 5px; margin-top: 10px; margin-bottom: 10px">
            Leaderboard
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
    </div>
@endsection
