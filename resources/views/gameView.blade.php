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
            <div class="col-6" style="background-color: #F6F6F6; border-radius: 5px; border-style: solid; border-radius: 20px; border-color: #CECECE">
                Apie zaidima:
                <br>{{ $data -> description }}
            </div>
            <div class="col-1" style="margin-left: 45px;margin-right: 45px; background-color: #F6F6F6; border-radius: 5px; border-style: solid; border-radius: 20px; border-color: #CECECE">
                Rating:
                <br>{{ $data -> rating }}/5
            </div>
            @if (session()->has('id'))
            <div class="col-4" style="background-color: #F6F6F6; border-radius: 5px; border-style: solid; border-radius: 20px; border-color: #CECECE">
                <form method="post" action="{{url('leaveReview')}}">
                    <input type="hidden" class="editInput" stype="string" name="gameId" value="{{ $data -> id_GAME }}" readonly>
                    @csrf
                    <table>
                        <tr>
                            <td  colspan="2">
                                <div id="full-stars-example-two">
                                    <div class="stars">
                                        <input class="star star-5" value="5" id="star-5" type="radio" name="star"/>
                                        <label class="star star-5" for="star-5"></label>
                                        <input class="star star-4" value="4" id="star-4" type="radio" name="star"/>
                                        <label class="star star-4" for="star-4"></label>
                                        <input class="star star-3" value="3" id="star-3" type="radio" name="star"/>
                                        <label class="star star-3" for="star-3"></label>
                                        <input class="star star-2" value="2" id="star-2" type="radio" name="star"/>
                                        <label class="star star-2" for="star-2"></label>
                                        <input class="star star-1" value="1" id="star-1" type="radio" name="star"/>
                                        <label class="star star-1" for="star-1"></label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Review</td>
                            <td><input type="text" name="review" value=""></td>
                        </tr>
                        <tr>
                            <td colspan="2"> <input type="submit" name="deletUser" value="Submit"></td>
                        </tr>
                    </table>
                </form>
            </div>
            @endif
        </div>
        <div class="row" style="margin-top: 10px; margin-bottom: 10px">
            <div style="background-color: #F6F6F6; border-radius: 5px; border-style: solid; border-radius: 20px; border-color: #CECECE" class="col-sm">
                Leaderboard:
                <table style="background-color: #F6F6F6; border-radius: 5px" class="table table-hover table-sm">
{{--                    <tr>--}}
{{--                        <th><h3>Username</h3></th>--}}
{{--                        <th><h3>Score</h3></th>--}}
{{--                        <th><h3>Date</h3></th>--}}
{{--                    </tr>--}}
                    @foreach($scores as $score)
                        <tr>
                            <td>{{ $score -> userName }}</td>
                            <td>{{ $score -> score }}</td>
{{--                            <td>{{ $score -> date }}</td>--}}
                        </tr>
                    @endforeach
                </table>
            </div>
            <div style="background-color: #F6F6F6; border-radius: 5px; border-style: solid; border-radius: 20px; border-color: #CECECE"  class="col-sm">
                Comments:
                <table style="background-color: #F6F6F6; border-radius: 5px" class="table table-hover table-sm">
{{--                    <tr>--}}
{{--                        <th><h3>Username</h3></th>--}}
{{--                        <th><h3>Rating</h3></th>--}}
{{--                        <th><h3>Comment</h3></th>--}}
{{--                    </tr>--}}
                    @foreach($comments as $comment)
                        <tr>
                            <td>{{ $comment -> userName }}</td>
{{--                            <td>{{ $comment -> rating }}</td>--}}
                            <td>{{ $comment -> description }}</td>
                        </tr>
                    @endforeach
                </table>
            </div>

        </div>
    </div>

@endsection
