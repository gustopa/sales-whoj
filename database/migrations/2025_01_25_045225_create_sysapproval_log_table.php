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
        Schema::create('sysapproval_log', function (Blueprint $table) {
            $table->increments('line_id');
            $table->integer('row_id')->index('row_id');
            $table->integer('company_id');
            $table->integer('seq')->nullable()->default(0)->index('seq');
            $table->integer('employee_id')->nullable()->default(0)->index('employee_id');
            $table->integer('groupapproval_id')->nullable()->default(0)->index('groupapproval_id');
            $table->string('approvalgroup_type', 100)->nullable();
            $table->string('rejection_type', 100)->nullable();
            $table->string('status', 100)->nullable();
            $table->integer('is_current')->nullable()->default(0)->index('is_current');
            $table->string('txt', 4000)->nullable();
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
        Schema::dropIfExists('sysapproval_log');
    }
};
