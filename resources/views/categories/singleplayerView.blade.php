@extends('layout')

@section('content')

    <div class="container mt-3">
        <div class="card-deck">
            <button class="card bg-primary" onclick="location.href='{{url('gameView/breakout')}}'">
                <p class="card-body card-text">Breakout</p>
            </button>
            <button class="card bg-success text-center card-text" onclick="location.href='{{url('gameView/clicker')}}'">
                <p class="card-body text-center card-text">Clicker</p>
            </button>
            <button class="card bg-danger" onclick="location.href='{{url('gameView/jumper')}}'">
                <p class="card-body text-center card-text">Jumper</p>
            </button>
        </div>
    </div>


@endsection
