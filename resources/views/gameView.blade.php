@extends('layout')

@section('content')

    <script>
        let myCoolCode = document.createElement("script");
        myCoolCode.setAttribute("src", "{{ $data -> script }}");
        document.body.appendChild(myCoolCode);
    </script>
    
    <div class="container">  {{--canvas --}}
       <div class="row">
           <canvas id="gameCanvas1" style="width: 100%; text-align: center; display: inline; border: solid #1a202c 5px; margin-top: 5px">
           </canvas>
       </div>
        <div class="row" style="margin-top: 10px">
            <div class="col-6" style="border: solid #1a202c 5px">
                Apie zaidima: {{ $data -> description }}
            </div>
            <div class="col-1" style="border: solid #1a202c 5px; margin-left: 5px">
                Rating:{{ $data -> rating }}
            </div>
        </div>
        <div class="row" style="border: solid #1a202c 5px; margin-top: 10px; margin-bottom: 10px">
            Leaderboard:
            <table>
                <tr>
                    <th><h3>Username</h3></th>
                    <th><h3>Score</h3></th>
                    <th><h3>Date</h3></th>
                </tr>
            @foreach($scores as $score)
                <tr>
                    <td>{{ $score -> userName }}</td>
                    <td>{{ $score -> score }}</td>
                    <td>{{ $score -> date }}</td>
                </tr>
            @endforeach
            </table>
        </div>
    </div>

@endsection
