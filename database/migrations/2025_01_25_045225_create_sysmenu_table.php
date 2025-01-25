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
        Schema::create('sysmenu', function (Blueprint $table) {
            $table->increments('row_id');
            $table->integer('foldermenu_id')->nullable()->default(0)->index('foldermenu_id');
            $table->string('name', 100)->nullable();
            $table->string('name_bahasa', 100)->nullable();
            $table->string('controller_menu', 100)->nullable();
            $table->integer('sequence')->nullable()->default(0)->index('sequence');
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
        Schema::dropIfExists('sysmenu');
    }
};
