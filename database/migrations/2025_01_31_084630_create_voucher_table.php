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
        Schema::create('voucher', function (Blueprint $table) {
            $table->integer('row_id', true);
            $table->string('unique_code', 100);
            $table->integer('amount');
            $table->integer('company_id');
            $table->integer('is_used');
            $table->dateTime('date_used')->nullable();
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
        Schema::dropIfExists('voucher');
    }
};
