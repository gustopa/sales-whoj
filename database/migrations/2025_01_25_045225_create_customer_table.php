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
        Schema::create('customer', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->string('customer_no', 100)->nullable()->index('customer_no');
            $table->string('name', 100)->nullable();
            $table->string('telp_no', 100)->nullable();
            $table->string('hp_bo', 100)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('address', 4000)->nullable();
            $table->string('city', 100)->nullable();
            $table->integer('city_id')->nullable();
            $table->string('email', 100)->nullable();
            $table->string('gender', 10)->nullable();
            $table->string('religion', 20)->nullable();
            $table->string('instagram', 100)->nullable();
            $table->string('pi_no', 45)->nullable();
            $table->date('visit_date')->nullable();
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
        Schema::dropIfExists('customer');
    }
};
