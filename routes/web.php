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


Route::get('login', [\App\Http\Controllers\userController::class, 'loginload']);
Route::get('register', [\App\Http\Controllers\userController::class, 'registerload']);
Route::get('logout', [\App\Http\Controllers\userController::class, 'logout']);
Route::post('loginconfirm', [\App\Http\Controllers\userController::class, 'login']);
Route::post('naujasVartotojas', [\App\Http\Controllers\userController::class, 'registerNew']);
