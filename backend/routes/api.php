<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->get('/register', function (Request $request) {
    return $request->register();
});

Route::get('/', function () {
    return response()->json([
        'Status' => false,
        'Message' => 'Access Denied',
    ], 401);
})->name('login');



//LOGIN

Route::prefix('a1')->group(function () {
    Route::controller(AuthController::class)->prefix('auth')->group(function () {

        Route::post('/login', 'login');
        Route::get('/logout', 'logout')->middleware('auth:sanctum');
        Route::post('/register', 'register');
        Route::get('/user', 'user')->middleware('auth:sanctum');
    });



    // PRODUCT
    Route::controller(ProductController::class)->prefix('product')->group(function () {

        Route::get('/allproduct', 'getAllProduct');
        Route::post('/addproduct', 'addProduct')->middleware('auth:sanctum');
        Route::put('/edit/{id}', 'editProduct')->middleware('auth:sanctum');
        Route::put('/editimg/{id}', 'editImgProduct')->middleware('auth:sanctum');
        Route::get('/getproduct/{id}', 'getProduct');
        Route::delete('/delete/{id}', 'deleteProduct')->middleware('auth:sanctum');
        Route::post('/buyproduct', 'buyProduct')->middleware('auth:sanctum');
        Route::get('/transaction', 'getAllTransaction')->middleware('auth:sanctum');
        Route::put('/uptstatus/{id}', 'updateTransactionStatus')->middleware('auth:sanctum');
        Route::post('/changestatus/{id}', 'updateTransactionStatus')->middleware('auth:sanctum');
        Route::delete('/deletestatus/{id}', 'deleteTransactionStatus')->middleware('auth:sanctum');
    });

});

