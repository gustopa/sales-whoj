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
        Schema::create('request_order', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->string('doc_no', 100)->nullable();
            $table->integer('store_id')->nullable()->default(0);
            $table->integer('customer_id')->nullable()->default(0);
            $table->integer('sales_id')->nullable();
            $table->date('trans_date')->nullable();
            $table->date('estimated_date')->nullable();
            $table->string('name', 100)->nullable();
            $table->integer('item_id');
            $table->integer('grouping_order_id');
            $table->string('identity_code', 20);
            $table->string('type_order', 100)->nullable();
            $table->string('outsource_intern', 20);
            $table->string('txt', 4000)->nullable();
            $table->integer('qty')->nullable();
            $table->string('size', 100)->nullable();
            $table->decimal('berat_emas', 5)->nullable();
            $table->string('warna_emas', 45)->nullable();
            $table->integer('kadar_emas')->nullable();
            $table->string('customer_material', 4000)->nullable();
            $table->decimal('estimated_price', 15)->nullable()->default(0);
            $table->decimal('down_payment', 15)->nullable()->default(0);
            $table->decimal('settlement', 15)->nullable()->default(0);
            $table->string('custom_box', 100)->nullable();
            $table->string('status', 100)->nullable();
            $table->string('online_offline', 100);
            $table->integer('is_sales_saved')->default(0);
            $table->integer('is_print_dp')->nullable()->default(0);
            $table->string('notes', 1000)->nullable();
            $table->string('photo_file', 100)->nullable();
            $table->decimal('berat_jadi', 5);
            $table->date('work_estimated_date');
            $table->integer('work_qty');
            $table->string('work_length', 100);
            $table->string('work_diameter', 100);
            $table->string('work_ring_size', 100);
            $table->string('work_gold_content', 100);
            $table->string('work_notes', 100);
            $table->string('work_supplier', 100);
            $table->string('work_status_order', 100);
            $table->string('work_spk_no', 100);
            $table->string('work_jwcad_3d', 100);
            $table->string('work_master', 100);
            $table->string('work_pb', 100);
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
        Schema::dropIfExists('request_order');
    }
};
