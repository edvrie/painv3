
@extends('layout')

@section('content')

    <div class="container mt-3">
        <div class="card-deck">
            <button class="card bg-primary" onclick="location.href='{{url('gameView')}}'">
                <div class="card-body text-center">
                    <p class="card-text">Some text inside the first card</p>
                </div>
            </button>
            <button class="card bg-warning">
                <div class="card-body text-center">
                    <p class="card-text">Some text inside the second card</p>
                </div>
            </button>
            <button class="card bg-success">
                <div class="card-body text-center">
                    <p class="card-text">Some text inside the third card</p>
                </div>
            </button>
            <button class="card bg-danger">
                <div class="card-body text-center">
                    <p class="card-text">Some text inside the fourth card</p>
                </div>
            </button>
        </div>
    </div>

@endsection


