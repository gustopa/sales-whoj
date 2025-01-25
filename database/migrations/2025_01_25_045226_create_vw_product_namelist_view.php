<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW `vw_product_namelist` AS select `" . env('DB_DATABASE') . "`.`product_name`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`product_name`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`product_name`.`Name` AS `Name`,`" . env('DB_DATABASE') . "`.`product_name`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`product_name`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`product_name`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`product_name`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`product_name`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`product_name`.`modified_by` AS `modified_by` from `" . env('DB_DATABASE') . "`.`product_name`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_product_namelist`");
    }
};
