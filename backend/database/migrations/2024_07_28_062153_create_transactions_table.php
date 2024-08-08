<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->string('product_name');
            $table->string('product_image');
            $table->string('user_name');
            $table->enum('status', ['pending', 'completed'])->default('pending');
            $table->timestamps();

            // Menambahkan foreign key constraints pada kolom product_name dan product_image
            $table->foreign('product_name')->references('product_name')->on('products')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('product_image')->references('product_image')->on('products')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_name')->references('name')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
