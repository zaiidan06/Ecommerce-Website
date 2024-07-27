<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function addProduct(Request $request)
{
    $validate = [
        'product_name' => 'required|unique:products,product_name',
        'product_image' => 'image|file|max:1024',
        'product_description' => 'required',
    ];

    $validator = Validator::make($request->all(), $validate);
    if ($validator->fails()) {
        return response()->json([
            'Status' => false,
            'Message' => 'Validation Process Failed',
            'data' => $validator->errors()
        ], 401);
    }

    $product_image = null;

    if ($request->hasFile('product_image')) {
        $file = $request->file('product_image');
        $file_name = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('public/product_image', $file_name);
        $product_image = 'storage/product_image/' . $file_name;
    }

    $data = Product::create([
        'id' => $request->id,
        'product_name' => $request->product_name,
        'product_image' => $product_image,
        'product_description' => $request->product_description,
    ]);

    return response()->json([
        'Status' => true,
        'Message' => 'Validation Process Success',
        'data' => $data
    ], 200);
}

    public function deleteProduct(string $id)
    {
        $data = Product::find($id);

        $deletedata = [
            'id' => $data->id,
            'product_name' => $data->product_name,
            'product_image' => $data->product_image,
            'product_description' => $data->product_description,
        ];

        if ($data) {

            $data->delete();
            return response()->json([
                "message" => "Delete data success",
                "data" => $deletedata
            ], 200);
        } else {
            return response()->json([
                "message" => "Delete data failed",
                "data" => $deletedata
            ], 404);
        }
    }


    public function getAllProduct()
    {

        $data = Product::all();

        return response()->json([
            "message" => "Success",
            "data" => $data
        ]);

    }
    public function editProduct(Request $request, string $id)
    {
        $validate = $request->validate([
            'product_name' => 'required',
            'product_description' => 'required',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validate);

        return response()->json([
            "message" => "Data berhasil diperbarui",
            "original_data" => $product->getOriginal(),
            "update_data" => $product->refresh()
        ], 200);
    }
    public function editImgProduct(Request $request, string $id)
    {
        $validate = $request->validate([
            'product_image' => 'required',
        ]);

        // Cari produk berdasarkan ID
        $product = Product::findOrFail($id);

        if ($request->hasFile('product_image')) {
            $image = $request->file('product_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('storage/product_image'), $imageName);
            $product->product_image = $imageName;
        }

        $product->save();

        return response()->json([
            "message" => "Data berhasil diperbarui",
            "original_data" => $product->getOriginal(),
            "update_data" => $product->refresh()
        ], 200);
    }


    public function getProduct($id)
    {
        $data = Product::findOrFail($id);
        $getdata = [
            'id' => $data->id,
            'product_name' => $data->product_name,
            'product_image' => $data->product_image,
            'product_description' => $data->product_description,
        ];

        if ($data) {
            return response()->json([
                "message" => "data success showed",
                "data" => $getdata
            ], 200);
        } else {
            return response()->json([
                "message" => "data show failed",
                "data" => $getdata
            ], 404);
        }
    }
}
