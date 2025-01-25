<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('syscompany', function (Blueprint $table) {
            $table->increments('row_id');
            $table->string('name', 100)->nullable();
            $table->string('address', 4000)->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('pic', 100)->nullable();
            $table->string('file_logo', 100)->nullable();
            $table->string('color', 10)->nullable();
            $table->integer('is_active')->nullable()->default(0)->index('is_active');
            $table->integer('is_submitted')->default(0)->index('is_submitted');
            $table->integer('is_deleted')->default(0)->index('is_deleted');
            $table->dateTime('created_date')->nullable();
            $table->string('created_by', 100)->nullable();
            $table->dateTime('modified_date')->nullable()->index('modified_date');
            $table->string('modified_by', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('syscompany');
    }
};
