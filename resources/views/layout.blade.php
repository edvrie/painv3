<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>ScuffedY8.5</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{asset('css/app.css?v=').time()}}">
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="https://use.fontawesome.com/9b26ec0efb.js"></script>
</head>

<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="{{ url('/') }}">Home</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Game Categories
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Arcade</a>
                    <a class="dropdown-item" href="#">Single player</a>
                    <a class="dropdown-item" href="#">Multiplayer</a>
                </div>
            </li>
            @if (session()->get('admin') == 1)
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Admin Functions
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="{{ url('/deleteUser') }}">Delete Users</a>
                    <a class="dropdown-item" href="{{ url('/deleteReview') }}">Delete Reviews</a>
                    <a class="dropdown-item" href="{{ url('/deleteScore') }}">Delete Scores</a>
                    <a class="dropdown-item" href="{{ url('/changeDescription') }}">Change Game Descriptions</a>
                </div>
            </li>
            @endif
        </ul>
        @if (session()->get('id') == null)
        <ul class="nav navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="{{ url('/register') }}"><span class="fas fa-user"></span> Sign Up</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{ url('/login') }}"><span class="fas fa-sign-in-alt"></span> Login</a>
            </li>
        </ul>
        @else
        <ul class="nav navbar-nav ml-auto">
            <li>
                <a class="nav-link" href="{{ url('/settings') }}"><span class="fa fa-cog"></span> Settings</a>
            </li>
            <li>
                <a class="nav-link" href="{{ url('/logout') }}"><span class="fas fa-sign-out-alt"></span> Logout</a>
            </li>
        </ul>
        @endif
    </div>
</nav>

@if (session('success'))
    <div class="alert alert-success">
        <h3>{{session('success')}}</h3>
    </div>
@endif
@if (session('danger'))
    <div class="alert alert-danger">
        <h3>{{session('danger')}}</h3>
    </div>
@endif

@yield('content')

</body>

</html>

