@extends('layout')

@section('content')

    <div class="mt-3 logindiv">
        <h1>Login</h1><br>
            <form action="{{ url('loginconfirm') }}" method="post">
                @csrf
            <table style="margin: 0 auto; text-align:left;">
                <tr>
                    <td><h3>Email:</h3></td>
                    <td><input type="email" name="email" value=""></td>
                </tr>
                <tr>
                    <th colspan="2"><p class="text-danger"></p></th>
                </tr>
                <tr>
                    <td><h3>Password:</h3></td>
                    <td><input type="password" name="password" value=""></td>
                </tr>
                <tr>
                    <th colspan="2"><p class="text-danger"></p></th>
                </tr>
            </table>
            <br><button type="submit" name="button">Login</button> <br> &nbsp
            </form>
    </div>


@endsection
