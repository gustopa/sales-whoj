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
        Schema::create('grouping_order_diamond', function (Blueprint $table) {
            $table->increments('line_id');
            $table->integer('row_id')->index('row_id');
            $table->integer('company_id')->index('company_id');
            $table->integer('grain')->nullable()->default(0);
            $table->decimal('grade', 15, 3)->nullable()->default(0);
            $table->string('diamond_type', 100)->nullable();
            $table->string('no_sert', 100)->nullable();
            $table->string('diameter', 100)->nullable();
            $table->string('color', 100)->nullable();
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
        Schema::dropIfExists('grouping_order_diamond');
    }
};
