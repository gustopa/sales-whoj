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
        Schema::create('sysapproval', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->integer('mappingapproval_id')->nullable()->default(0)->index('mappingapproval_id');
            $table->string('name', 100)->nullable()->index('name');
            $table->string('approval_for', 100)->nullable()->index('approval_for');
            $table->string('data_no', 100)->nullable()->index('data_no');
            $table->integer('data_id')->index('data_id');
            $table->string('controller', 100)->nullable();
            $table->string('last_status', 100)->nullable()->index('last_status');
            $table->integer('submitter_id')->nullable()->default(0)->index('submitter_id');
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
        Schema::dropIfExists('sysapproval');
    }
};
