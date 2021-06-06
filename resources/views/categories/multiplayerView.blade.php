@extends('layout')

@section('content')

    <div class="container mt-3">
        <div class="card-deck">
            <button class="card bg-warning" onclick="location.href='{{url('gameView/pong')}}'">
                <p class="card-body text-center card-text">Pong</p>
            </button>
        </div>
    </div>


@endsection
