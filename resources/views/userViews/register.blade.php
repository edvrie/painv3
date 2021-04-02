@extends('layout')

@section('content')

    <div class="mt-3 logindiv">
        <h1>Register</h1><br>
        <form method="post" action="{{url('naujasVartotojas')}}">
            @csrf
            <table style="margin: 0 auto; text-align:left;">
                <tr>
                    <td><h3>Email:</h3></td>
                    <td><input type="text" name="email" value=""></td>
                </tr>
                <tr>
                    <th colspan="2"><p class="text-danger">{{ $errors->first('email') }}</p></th>
                </tr>
                <tr>
                    <td><h3>Username:</h3></td>
                    <td><input type="text" name="username" value=""></td>
                </tr>
                <tr>
                    <th colspan="2"><p class="text-danger">{{ $errors->first('username') }}</p></th>
                </tr>
                <tr>
                    <td><h3>Password:</h3></td>
                    <td><input type="text" name="password" value=""></td>
                </tr>
                <tr>
                    <th colspan="2"><p class="text-danger">{{ $errors->first('password') }}</p></th>
                </tr>
            </table>
            <br><th colspan="2" align="center"><button type="submit" name="button">Register</button></th><br>&nbsp
        </form>
    </div>

@endsection