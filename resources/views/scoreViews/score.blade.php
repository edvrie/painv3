@extends('layout')

@section('content')

    <div class="mt-3">
        <table class="table table-striped table-bordered table-hover table-sm">
            <tr>
                <th class="Centered HeaderColor">Username</th>
                <th class="Centered HeaderColor">Game name</th>
                <th class="Centered HeaderColor">Score</th>
                <th class="Centered HeaderColor">Date</th>
                <th class="Centered HeaderColor"></th>
            </tr>
            @foreach($data as $duomenys)

                <tr>
                    <td class="Centered">{{ $duomenys -> userName }}</td>
                    <td class="Centered">{{ $duomenys -> gameName }}</td>
                    <td class="Centered">{{ $duomenys -> score }}</td>
                    <td class="Centered">{{ $duomenys -> date }}</td>
                    <form method="post" action="{{url('deleteSelectedScore')}}">
                        @csrf
                        <input type="hidden" class="editInput" stype="string" name="id" value="{{ $duomenys -> id_SCORES }}" readonly>
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
