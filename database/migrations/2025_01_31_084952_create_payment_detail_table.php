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
        Schema::create('payment_detail', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('sequence');
            $table->integer('row_id');
            $table->decimal('amount', 18);
            $table->dateTime('trans_date');
            $table->integer('payment_type_id');
            $table->integer('edc_id')->nullable()->default(0);
            $table->integer('voucher_id')->nullable()->default(0);
            $table->integer('is_deleted');
            $table->dateTime('created_date');
            $table->string('created_by', 100);
            $table->dateTime('modified_date');
            $table->string('modified_by', 100);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_detail');
    }
};
