@extends('layout')

@section('content')

    <div class="mt-3 settingsdiv">

        <table>
            <tr>
                <th><h3>Creation date</h3></th>
                <th><h3>Last login</h3></th>
            </tr>
            <tr>
                <td style="padding:0"><input class="editInput" stype="string" name="creationDate" value="{{ $data -> creationDate }}" readonly></td>
                <td style="padding:0"><input class="editInput" stype="string" name="lastLoggedIn" value="{{ $data -> lastLoggedIn }}" readonly></td>
            </tr>
        </table>
        <br>
        <table>
            <tr>
                <th><h3>Username</h3></th>
                <th><h3>Nickname</h3></th>
                <th><h3>Password</h3></th>
                <th><h3>Email</h3></th>
            </tr>
            <tr>
                <form method="post" action="{{url('changeSettings')}}">
                    @csrf
                    <td style="margin:0;padding:0"><input class="editInput" stype="string" name="username" value="{{ $data -> username }}"></td>
                    <td style="padding:0"><input class="editInput" stype="string" name="nickname" value="{{ $data -> nickname }}"></td>
                    <td style="padding:0"><input class="editInput" stype="string" name="password" value="{{ $data -> password }}"></td>
                    <td style="padding:0"><input class="editInput" stype="string" name="email" value="{{ $data -> email }}"></td>
                    <td style="padding:0"> <input type="submit" name="addPreke" value="Change"></td>
                </form>
            </tr>
            <tr>
                <td colspan="1"><p class="text-danger">{{ $errors->first('username') }}</p></td>
                <td colspan="1"><p class="text-danger">{{ $errors->first('nickname') }}</p></td>
                <td colspan="1"><p class="text-danger">{{ $errors->first('password') }}</p></td>
                <td colspan="1"><p class="text-danger">{{ $errors->first('email') }}</p></td>
            </tr>
        </table>
        <br>
        <h5>
            If you don't have a nickname set, your username will be used for global leaderboards
        </h5>
        <table>
            <tr>
                <form method="post" action="{{url('resetNickname')}}">
                    @csrf
                    <td style="padding:0"><input type="submit" name="addPreke" value="Reset Nickname"></td>
                </form>
            </tr>
        </table>

    </div>

@endsection
