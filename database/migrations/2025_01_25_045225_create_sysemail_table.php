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
        Schema::create('sysemail', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->integer('email_from')->nullable()->default(0);
            $table->integer('email_to')->nullable()->default(0);
            $table->string('email_subject', 100)->nullable();
            $table->string('attachment', 100)->nullable();
            $table->string('content', 4000)->nullable();
            $table->integer('is_send')->nullable()->default(0);
            $table->date('send_date')->nullable();
            $table->string('txt', 4000)->nullable();
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
        Schema::dropIfExists('sysemail');
    }
};
