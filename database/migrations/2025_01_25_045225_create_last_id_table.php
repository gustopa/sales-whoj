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
        Schema::create('last_id', function (Blueprint $table) {
            $table->integer('row_id')->primary();
            $table->integer('payment_id')->nullable();
            $table->integer('payment_order_id')->nullable();
            $table->integer('refund_id')->nullable();
            $table->integer('inventory_id')->nullable();
            $table->integer('customer_id')->nullable();
            $table->integer('reparasi_id');
            $table->integer('production_id')->default(0);
            $table->integer('work_id')->default(0);
            $table->integer('frame_type_id')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('last_id');
    }
};
