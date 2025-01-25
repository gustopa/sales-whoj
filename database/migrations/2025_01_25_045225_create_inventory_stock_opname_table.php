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
        Schema::create('inventory_stock_opname', function (Blueprint $table) {
            $table->integer('row_id', true);
            $table->string('plu', 10)->nullable();
            $table->string('store', 45)->nullable();
            $table->string('status', 10)->nullable();
            $table->string('notes', 200)->nullable();
            $table->integer('ordr')->nullable()->default(0);
            $table->dateTime('created_date')->nullable();
            $table->string('created_by', 45)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_stock_opname');
    }
};
