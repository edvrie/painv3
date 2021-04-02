@extends('layout')

@section('content')

    <div class="mt-3 logindiv">
        <h1>Registracija</h1><br>
        <form method="post" action="{{url('naujasVartotojas')}}">
            @csrf
            <table style="margin: 0 auto; text-align:left;">
                <tr>
                    <td><h3>E.paštas:</h3></td>
                    <td><input type="text" name="pastas" value=""></td>
                </tr>
                <tr>
                    <th colspan="2"><p class="text-danger">{{ $errors->first('pastas') }}</p></th>
                </tr>
                <tr>
                    <td><h3>Slaptažodis:</h3></td>
                    <td><input type="text" name="slaptazodis" value=""></td>
                </tr>
                <tr>
                    <th colspan="2"><p class="text-danger">{{ $errors->first('slaptazodis') }}</p></th>
                </tr>
            </table>
            <br><th colspan="2" align="center"><button type="submit" name="button">Registruotis</button></th><br>&nbsp
        </form>
    </div>

@endsection
