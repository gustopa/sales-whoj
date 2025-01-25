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
        Schema::create('payment', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->string('doc_no', 100)->nullable();
            $table->integer('sales_id')->nullable()->default(0)->index('sales_id');
            $table->integer('store_id')->nullable()->default(0)->index('store_id');
            $table->integer('customer_id')->nullable()->default(0)->index('customer_id');
            $table->integer('trans_type_id')->nullable()->default(0)->index('trans_type_id');
            $table->date('trans_date')->nullable();
            $table->string('notes', 100)->nullable();
            $table->integer('payment_type_id')->nullable();
            $table->integer('edc_id')->nullable();
            $table->integer('payment_order_id')->nullable();
            $table->integer('inventory_id')->nullable()->default(0);
            $table->decimal('inventory_price', 18)->nullable()->default(0);
            $table->decimal('percent_disc', 18)->nullable()->default(0);
            $table->decimal('selling_price', 18)->nullable()->default(0);
            $table->decimal('diff_percent', 5)->nullable();
            $table->decimal('amount', 18)->nullable();
            $table->string('status', 20)->nullable();
            $table->integer('is_print')->default(0);
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
        Schema::dropIfExists('payment');
    }
};
