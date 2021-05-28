@extends('layout')

@section('content')

    <div style="background-color: #F6F6F6; border-radius: 5px; border-style: solid; border-radius: 20px; border-color: #CECECE" class=" box mt-3 settingsdiv d">
        <table style="margin-left: 50px;">
            <form method="post" action="{{url('changeSettings')}}">
                @csrf
                <tr>
                    <td colspan="2"><p class="text-danger">{{ $errors->first('username') }}</p></td>
                </tr>
                <tr>
                    <th><h3>Username</h3></th>
                    <td style="margin:0;padding:0"><input style="border-radius: 5px; margin-left: 5px;" class="editInput" stype="string" name="username" value="{{ $data -> username }}"></td>
                </tr>
                <tr>
                    <td colspan="2"><p class="text-danger">{{ $errors->first('nickname') }}</p></td>
                </tr>
                <tr>
                    <th><h3>Nickname</h3></th>
                    <td style="padding:0"><input style="border-radius: 5px; margin-left: 5px;" class="editInput" stype="string" name="nickname" value="{{ $data -> nickname }}"></td>
                </tr>
                <tr>
                    <td colspan="2"><p class="text-danger">{{ $errors->first('password') }}</p></td>
                </tr>
                <tr>
                    <th><h3>Password</h3></th>
                    <td style="padding:0"><input style="border-radius: 5px; margin-left: 5px;" class="editInput" stype="string" type="password"  name="password" value=""></td>
                </tr>
                <tr>
                    <td colspan="2"><p class="text-danger">{{ $errors->first('email') }}</p></td>
                </tr>
                <tr>
                    <th><h3>Email</h3></th>
                    <td style="padding:0"><input style="border-radius: 5px; margin-left: 5px;" class="editInput" stype="string" name="email" value="{{ $data -> email }}"></td>
                </tr>
                <tr>
                    <td colspan="1" style="padding:0" > <input type="submit" name="addPreke" value="Change"></td>
                </tr>
            </form>
        </table>
        <br>
        <h5>
            &nbsp; If you don't have a nickname set <br>
            &nbsp; your username will be used for   <br>
            &nbsp; global leaderboards
        </h5>
        <table style="margin-left: 10px;">
            <tr>
                <form method="post" action="{{url('resetNickname')}}">
                    @csrf
                    <td style="padding:0"><input type="submit" name="addPreke" value="Reset Nickname"></td>
                </form>
            </tr>
        </table>

    </div>

@endsection
