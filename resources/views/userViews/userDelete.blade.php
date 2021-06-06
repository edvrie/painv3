@extends('layout')

@section('content')

    <div class="mt-3">
        <table class="table table-striped table-bordered table-hover table-sm">
                <tr>
                    <th class="Centered HeaderColor">Username</th>
                    <th class="Centered HeaderColor">Nickname</th>
                    <th class="Centered HeaderColor">Email</th>
                    <th class="Centered HeaderColor">Last Login</th>
                    <th class="Centered HeaderColor">Creation</th>
                    <th class="Centered HeaderColor"></th>
                </tr>
            @foreach($data as $duomenys)
                <tr>
                    <td class="Centered">{{ $duomenys -> username }}</td>
                    <td class="Centered">{{ $duomenys -> nickname }}</td>
                    <td class="Centered">{{ $duomenys -> email }}</td>
                    <td class="Centered">{{ $duomenys -> lastLoggedIn }}</td>
                    <td class="Centered">{{ $duomenys -> creationDate }}</td>
                    <form method="post" action="{{url('deleteSelectedUser')}}">
                        @csrf
                        <input type="hidden" class="editInput" stype="string" name="id" value="{{ $duomenys -> id_USERS }}" readonly>
                        <td  class="Centered"><input type="submit" onclick="return myFunction({{ $duomenys }})" name="deletUser" value="Delete"></td>
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
