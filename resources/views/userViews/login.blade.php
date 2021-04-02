@extends('layout')

@section('content')

    <div class="mt-3 logindiv">
        <h1>Prisijungimas</h1><br>
            <form action="{{ url('loginconfirm') }}" method="post">
                @csrf
            <table style="margin: 0 auto; text-align:left;">
                <tr>
                    <td><h3>E.paštas</h3></td>
                    <td><input type="email" name="pastoAdresas" value=""></td>
                </tr>
                <tr>
                    <td><h3>Slaptažodis</h3></td>
                    <td><input type="password" name="slaptazodis" value=""></td>
                </tr>
            </table>
            <br><button type="submit" name="button">Prisijungti</button> <br> &nbsp
            </form>
    </div>


@endsection
