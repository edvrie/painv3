@extends('layout')

@section('content')

    <div class="mt-3">
        <table>
            <tr>
                <th><h3>Username</h3></th>
                <th><h3>Game name</h3></th>
                <th><h3>Rating</h3></th>
                <th><h3>Description</h3></th>
            </tr>
            @foreach($data as $duomenys)

                <tr>
                    <td>{{ $duomenys -> userName }}</td>
                    <td>{{ $duomenys -> gameName }}</td>
                    <td>{{ $duomenys -> rating }}</td>
                    <td>{{ $duomenys -> description }}</td>
                    <form method="post" action="{{url('deleteSelectedReview')}}">
                        @csrf
                        <input type="hidden" class="editInput" stype="string" name="id" value="{{ $duomenys -> id_REVIEW }}" readonly>
                        <td><input type="submit" onclick="return myFunction({{ $duomenys }})" name="deletUser" value="Delete"></td>
                    </form>
                </tr>
            @endforeach
        </table>
    </div>

    <script>
        function myFunction(duomuo) {
            return confirm("Are You Sure to delete \"" + duomuo.userName + "\"");

        }
    </script>
@endsection
