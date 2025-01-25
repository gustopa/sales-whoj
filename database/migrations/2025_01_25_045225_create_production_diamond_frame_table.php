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
        Schema::create('production_diamond_frame', function (Blueprint $table) {
            $table->increments('line_id');
            $table->integer('row_id')->index('row_id');
            $table->integer('company_id')->index('company_id');
            $table->string('period', 100)->nullable()->index('period');
            $table->string('work_no', 100)->nullable()->index('work_no');
            $table->integer('craftsman_id')->nullable()->default(0)->index('craftsman_id');
            $table->integer('frame_no')->nullable()->default(0)->index('frame_no');
            $table->dateTime('delivery_date')->nullable();
            $table->decimal('weight', 15, 3)->nullable()->default(0);
            $table->string('period_received', 100)->nullable();
            $table->dateTime('received_date')->nullable();
            $table->decimal('received_weight', 15, 3)->nullable()->default(0);
            $table->string('photo', 100)->nullable();
            $table->string('status', 100)->nullable();
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
        Schema::dropIfExists('production_diamond_frame');
    }
};
