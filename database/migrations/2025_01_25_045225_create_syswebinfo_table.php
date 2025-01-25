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
        Schema::create('syswebinfo', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('company_id')->index('company_id');
            $table->string('application_name', 100)->nullable();
            $table->string('web_title', 100)->nullable();
            $table->string('web_description', 4000)->nullable();
            $table->string('file_logo_w', 100)->nullable();
            $table->string('file_logo_c', 100)->nullable();
            $table->string('file_icon', 100)->nullable();
            $table->string('format_date', 100)->nullable();
            $table->string('currency', 100)->nullable();
            $table->string('email_admin', 100)->nullable();
            $table->string('email_from', 100)->nullable();
            $table->string('email_contact_name', 100)->nullable();
            $table->string('smtp_host', 100)->nullable();
            $table->string('smtp_port', 100)->nullable();
            $table->string('smtp_user', 100)->nullable();
            $table->string('smtp_pass', 100)->nullable();
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
        Schema::dropIfExists('syswebinfo');
    }
};
