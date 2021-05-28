@extends('layout')

@section('content')

    <div class="mt-3">
        <table class="table table-striped table-bordered table-hover table-sm">
            <tr>
                <th class="Centered HeaderColor"><h3>Username</h3></th>
                <th class="Centered HeaderColor"><h3>Game name</h3></th>
                <th class="Centered HeaderColor"><h3>Rating</h3></th>
                <th class="Centered HeaderColor"><h3>Description</h3></th>
                <th class="Centered HeaderColor"></th>
            </tr>
            @foreach($data as $duomenys)

                <tr>
                    <td class="Centered">{{ $duomenys -> userName }}</td>
                    <td class="Centered">{{ $duomenys -> gameName }}</td>
                    <td class="Centered">{{ $duomenys -> rating }}</td>
                    <td>{{ $duomenys -> description }}</td>
                    <form method="post" action="{{url('deleteSelectedReview')}}">
                        @csrf
                        <input type="hidden" class="editInput" stype="string" name="id" value="{{ $duomenys -> id_REVIEW }}" readonly>
                        <td class="Centered"><input type="submit" onclick="return myFunction({{ $duomenys }})" name="deletUser" value="Delete"></td>
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
