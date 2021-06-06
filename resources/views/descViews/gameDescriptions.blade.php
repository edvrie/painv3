@extends('layout')

@section('content')

    <div class="mt-3">
        <table class="table table-striped table-bordered table-hover table-sm">
            <tr>
                <th class="Centered HeaderColor">Name</th>
                <th class="Centered HeaderColor">Description</th>
                <th class="Centered HeaderColor"></th>
            </tr>
            @foreach($data as $duomenys)

                <tr>
                    <td class="Centered">{{ $duomenys -> name }}</td>
                    <form method="post" action="{{url('changeDescriptionSubmit')}}">
                        @csrf
                        <td class="Centered"><input type="text" style="border:none; width: 100%; background-color: transparent" class="editInput" stype="string" name="description" value="{{ $duomenys -> description }}"></td>
                        <input type="hidden" class="editInput" stype="string" name="id" value="{{ $duomenys -> id_GAME }}" readonly>
                        <td class="Centered"><input type="submit" onclick="return myFunction({{ $duomenys }})" name="deletUser" value="Change"></td>
                    </form>
                </tr>
            @endforeach
        </table>
    </div>

    <script>
        function myFunction(duomuo) {
            return confirm("Are You Sure to change description of \"" + duomuo.name + "\"");

        }
    </script>
@endsection
