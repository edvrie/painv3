@extends('layout')

@section('content')

    <div class="mt-3">
        <table>
            <tr>
                <th><h3>Username</h3></th>
                <th><h3>Nickname</h3></th>
                <th><h3>Email</h3></th>
                <th><h3>Last Login</h3></th>
                <th><h3>Creation</h3></th>
            </tr>
            @foreach($data as $duomenys)

            <tr>
                <td>{{ $duomenys -> username }}</td>
                <td>{{ $duomenys -> nickname }}</td>
                <td>{{ $duomenys -> email }}</td>
                <td>{{ $duomenys -> lastLoggedIn }}</td>
                <td>{{ $duomenys -> creationDate }}</td>
                <form method="post" action="{{url('deleteSelectedUser')}}">
                    @csrf
                    <input type="hidden" class="editInput" stype="string" name="id" value="{{ $duomenys -> id_USERS }}" readonly>
                    <td><input type="submit" onclick="return myFunction({{ $duomenys }})" name="deletUser" value="Pašalinti"></td>
                </form>
            </tr>
            @endforeach
        </table>
    </div>

    <script>
        function myFunction(duomuo) {
            return confirm("Are You Sure to delete \"" + duomuo.username + "\"");

        }
    </script>
@endsection
