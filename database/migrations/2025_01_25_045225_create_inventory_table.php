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
        Schema::create('inventory', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->string('identity_code', 100)->nullable()->index('identity_code');
            $table->string('name', 100)->nullable();
            $table->integer('store_id')->nullable();
            $table->integer('item_type_id')->nullable()->default(0)->index('item_type_id');
            $table->integer('item_id')->nullable()->default(0)->index('item_id');
            $table->integer('model_id')->nullable()->default(0)->index('model_id');
            $table->integer('location_id');
            $table->integer('position_id');
            $table->integer('payment_order_id')->nullable();
            $table->integer('product_name_id');
            $table->string('item_source', 45)->nullable();
            $table->string('kode_supplier', 100);
            $table->string('gold_weight', 100)->nullable();
            $table->string('gold_grade', 100)->nullable();
            $table->decimal('gold_price', 18, 3)->nullable();
            $table->integer('photo_inventory_id')->nullable()->default(0)->index('photo_inventory_id');
            $table->integer('labour_price_id')->nullable();
            $table->decimal('other_expense', 18)->nullable();
            $table->decimal('basic_price_usd', 18)->nullable()->default(0);
            $table->decimal('profit_margin', 10)->nullable()->default(0);
            $table->decimal('buy_rate', 15, 0)->nullable()->default(0);
            $table->decimal('sold_rate', 15, 0)->nullable()->default(0);
            $table->decimal('calc_price', 18);
            $table->decimal('production_cost', 18);
            $table->decimal('markup', 5);
            $table->decimal('sell_price', 18, 0)->nullable()->default(0);
            $table->string('status', 100)->nullable();
            $table->string('file_certificate', 100);
            $table->string('ses_id', 15);
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
        Schema::dropIfExists('inventory');
    }
};
