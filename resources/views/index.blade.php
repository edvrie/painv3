
@extends('layout')

@section('content')

    <div class="container mt-3">
        <div class="card-deck">
            <button class="card bg-primary" onclick="location.href='{{url('gameView/breakout')}}'">
                <div class="card-body">
                    <p class="card-text">Breakout</p>
                </div>
            </button>
            <button class="card bg-warning" onclick="location.href='{{url('gameView/pong')}}'">
                <div class="card-body text-center">
                    <p class="card-text">Pong</p>
                </div>
            </button>
            <button class="card bg-success" onclick="location.href='{{url('gameView/clicker')}}'">
                <div class="card-body text-center">
                    <p class="card-text">Clicker</p>
                </div>
            </button>
            <button class="card bg-danger">
                <div class="card-body text-center" onclick="location.href='{{url('gameView/jumper')}}'">
                    <p class="card-text">Jumper</p>
                </div>
            </button>
        </div>
    </div>


@endsection

