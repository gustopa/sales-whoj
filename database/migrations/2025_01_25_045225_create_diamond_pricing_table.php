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
        Schema::create('diamond_pricing', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->integer('diamond_shape_id')->nullable()->default(0)->index('diamond_shape_id');
            $table->string('diamond_type', 100)->nullable();
            $table->string('name', 100)->nullable();
            $table->decimal('size_from', 10, 3)->nullable()->default(0);
            $table->decimal('size_to', 10, 3)->nullable()->default(0);
            $table->decimal('price', 15)->nullable()->default(0);
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
        Schema::dropIfExists('diamond_pricing');
    }
};
