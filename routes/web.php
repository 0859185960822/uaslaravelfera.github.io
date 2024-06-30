<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('layout.home');
});

Route::get('/bio', function () {
    return view('layout.bio');
});

Route::get('/kontak', function () {
    return view('layout.kontak');
});

Route::get('/wordpress', function () {
    return view('layout.wordpress');
});

Route::get('/kiddie', function () {
    return view('layout.kiddie');
});