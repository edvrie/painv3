<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/gameView', function () {
    return view('gameView');
});

Route::get('gameView/{id}', [\App\Http\Controllers\gameController::class, 'gameViewLoad']);

Route::get('deleteReview', [\App\Http\Controllers\reviewController::class, 'reviewDeleteLoad']);
Route::get('deleteUser', [\App\Http\Controllers\userController::class, 'userDeleteload']);
Route::get('deleteScore', [\App\Http\Controllers\scoreController::class, 'scoreDeleteload']);

Route::get('login', [\App\Http\Controllers\userController::class, 'loginload']);
Route::get('register', [\App\Http\Controllers\userController::class, 'registerload']);
Route::get('logout', [\App\Http\Controllers\userController::class, 'logout']);
Route::get('settings', [\App\Http\Controllers\userController::class, 'settingsLoad']);
Route::get('changeDescription', [\App\Http\Controllers\gameController::class, 'changeGameDescriptionLoad']);
Route::post('loginconfirm', [\App\Http\Controllers\userController::class, 'login']);
Route::post('naujasVartotojas', [\App\Http\Controllers\userController::class, 'registerNew']);
Route::post('changeSettings', [\App\Http\Controllers\userController::class, 'changeSettings']);
Route::post('resetNickname', [\App\Http\Controllers\userController::class, 'resetNickname']);

Route::post('deleteSelectedUser', [\App\Http\Controllers\userController::class, 'userDelete']);
Route::post('deleteSelectedReview', [\App\Http\Controllers\reviewController::class, 'reviewDelete']);
Route::post('deleteSelectedScore', [\App\Http\Controllers\scoreController::class, 'scoreDelete']);
Route::post('leaveReview', [\App\Http\Controllers\reviewController::class, 'leaveUserReview']);

Route::post('postScore', [\App\Http\Controllers\scoreController::class, 'postScore']);
Route::post('changeDescriptionSubmit', [\App\Http\Controllers\gameController::class, 'changeGameDescription']);
